import { ActionType } from '../action-types';
import {
  DeleteCellAction,
  Direction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { CellTypes } from '../cell';

export function updateCell(id: string, content: string): UpdateCellAction {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
}

export function moveCell(id: string, direction: Direction): MoveCellAction {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
}

export function deleteCell(id: string): DeleteCellAction {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
}

export function insertCellAfter(
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
}
