import { Injectable } from '@nestjs/common';
import { set } from 'lodash';
import {
  SelectQueryBuilder,
  MoreThan,
  LessThan,
  IsNull,
  Not,
  MoreThanOrEqual,
  LessThanOrEqual,
  ILike,
  In,
  FindOperator,
  Equal,
} from 'typeorm';
import { SortOrder } from './api/sort-order.enum';
import { PaginationDirection } from './api/pagination-direction.enum';
import { FilterRule } from './api/filter-rule.input';
import { FilterExpression } from './api/filter-expression.enum';
import { PaginationInput } from './api/pagination.input';

@Injectable()
export class PaginationService<Entity extends { id: number }> {
  static readonly DEFAULT_PAGE_SIZE = 25;

  private static convertCursorToId(cursor: string): number {
    return Number(Buffer.from(cursor, 'base64').toString('ascii'));
  }

  private static convertIdToCursor(id: number): string {
    return Buffer.from(id.toString()).toString('base64');
  }

  private mapFilterToFindOperator(
    expression: FilterExpression,
    value: string,
  ): FindOperator<string | undefined> {
    switch (expression) {
      case FilterExpression.IS_NULL:
        return IsNull();
      case FilterExpression.IS_NOT_NULL:
        return Not(IsNull());
      case FilterExpression.EQUALS:
        return Equal(value);
      case FilterExpression.NOT_EQUALS:
        return Not(value);
      case FilterExpression.GREATER_THAN:
        return MoreThan(value);
      case FilterExpression.GREATER_THAN_OR_EQUALS:
        return MoreThanOrEqual(value);
      case FilterExpression.LESS_THAN:
        return LessThan(value);
      case FilterExpression.LESS_THAN_OR_EQUALS:
        return LessThanOrEqual(value);
      case FilterExpression.LIKE:
        return ILike(`%${value}%`);
      case FilterExpression.NOT_LIKE:
        return Not(ILike(`%${value}%`));
      case FilterExpression.IN:
        return In(value.split(','));
      case FilterExpression.NOT_IN:
        return Not(In(value.split(',')));
      default:
        throw new Error(`Unknown filter expression ${expression}`);
    }
  }

  private getFilter = (filter: FilterRule) => {
    const { expression, property, value } = filter;
    const findOperator = this.mapFilterToFindOperator(expression, value);

    return set({}, property, findOperator);
  };

  async hasItems(
    query: SelectQueryBuilder<Entity>,
    nodes: Entity[],
    direction: PaginationDirection,
    idField: string,
  ): Promise<boolean> {
    const whereClause = query.expressionMap?.wheres.length
      ? 'andWhere'
      : 'where';

    const comparisonCondition =
      direction === PaginationDirection.FORWARD
        ? `${idField} > :${idField}`
        : `${idField} < :${idField}`;

    const offsetId =
      direction === PaginationDirection.FORWARD
        ? nodes[0]?.id ?? null
        : nodes[nodes.length - 1]?.id ?? null;

    const count = await query[whereClause](comparisonCondition, {
      [idField]: offsetId,
    }).getCount();

    return count > 0;
  }

  async paginate(
    query: SelectQueryBuilder<Entity>,
    input: PaginationInput,
    idField: string = 'id',
  ) {
    const {
      cursor = null,
      direction = PaginationDirection.FORWARD,
      limit = PaginationService.DEFAULT_PAGE_SIZE,
      sort = null,
      filter = null,
    } = input;

    const totalQuery = query.clone();

    const DEFAULT_ORDER = { [idField]: SortOrder.ASC };
    const orderBys = sort
      ? sort.reduce(
          (acc, { direction, property }) => ({ [property]: direction, ...acc }),
          DEFAULT_ORDER,
        )
      : DEFAULT_ORDER;

    const result = query.orderBy(orderBys);

    if (cursor) {
      const offsetId = PaginationService.convertCursorToId(cursor);
      const where =
        direction === PaginationDirection.FORWARD
          ? MoreThan(offsetId)
          : LessThan(offsetId);

      const whereClause = query.expressionMap?.wheres.length
        ? 'andWhere'
        : 'where';

      result[whereClause]({ [idField]: where });
    }

    if (filter) {
      const where = filter.reduce(
        (acc, clause) => ({ ...acc, ...this.getFilter(clause) }),
        {},
      );

      query.andWhere(where);
    }

    const data = await result.take(limit).getMany();

    const edges = data.map((item) => ({
      node: item,
      cursor: PaginationService.convertIdToCursor(item.id),
    }));

    const [hasPrevPage, hasNextPage] = await Promise.all([
      this.hasItems(totalQuery, data, PaginationDirection.BACKWARD, idField),
      this.hasItems(totalQuery, data, PaginationDirection.FORWARD, idField),
    ]);

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPrevPage,
      },
    };
  }
}
