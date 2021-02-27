import { DEFAULT_LOGIC_CONSTANTS_TO_IMPORT } from './default-logic-constants-to-import.constant';
import { DEFAULT_ARITHMETIC_CONSTANTS_TO_IMPORT } from './default-arithmetic-constants-to-import.constant';
import { DEFAULT_FROM_CONSTANTS_TO_IMPORT } from './default-from-constants-to-import.constant';
import { DEFAULT_COMPARISON_CONSTANTS_TO_IMPORT } from './default-comparison-constants-to-import.constant';
import { DEFAULT_PIPE_CONSTANTS_TO_IMPORT } from './default-pipe-constants-to-import.constant';

export const DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT = {
  ...DEFAULT_LOGIC_CONSTANTS_TO_IMPORT,
  ...DEFAULT_ARITHMETIC_CONSTANTS_TO_IMPORT,
  ...DEFAULT_COMPARISON_CONSTANTS_TO_IMPORT,
  ...DEFAULT_FROM_CONSTANTS_TO_IMPORT,
  ...DEFAULT_PIPE_CONSTANTS_TO_IMPORT,
};



