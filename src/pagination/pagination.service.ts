import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder, MoreThan, LessThan } from 'typeorm';
import { SortOrder } from './api/sort-order.enum';
import { PaginationDirection } from './api/pagination-direction.enum';

@Injectable()
export class PaginationService<T extends { id: number }> {
  static readonly DEFAULT_PAGE_SIZE = 25;

  private static convertCursorToId(cursor: string): number {
    return Number(Buffer.from(cursor, 'base64').toString('ascii'));
  }

  private static convertIdToCursor(id: number): string {
    return Buffer.from(id.toString()).toString('base64');
  }

  async hasItems(
    query: SelectQueryBuilder<T>,
    nodes: T[],
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
    query: SelectQueryBuilder<T>,
    cursor: string | null = null,
    direction: PaginationDirection = PaginationDirection.FORWARD,
    limit: number = PaginationService.DEFAULT_PAGE_SIZE,
    idField: string = 'id',
  ) {
    const totalQuery = query.clone();

    const result = query.orderBy({ [idField]: SortOrder.ASC });

    if (cursor) {
      const offsetId = PaginationService.convertCursorToId(cursor);
      const where =
        direction === PaginationDirection.FORWARD
          ? MoreThan(offsetId)
          : LessThan(offsetId);

      result.where({ [idField]: where });
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
