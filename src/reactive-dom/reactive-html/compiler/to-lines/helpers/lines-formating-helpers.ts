import { ILines } from '../compiler.types';

export function indentLines(
  lines: ILines,
  indent: string = '  ',
  copy: boolean = false,
): ILines {
  if (copy) {
    return lines.map((line: string) => (indent + line));
  } else {
    for (let i = 0, l = lines.length; i < l; i++) {
      lines[i] = indent + lines[i];
    }
    return lines;
  }
}

export function scopeLines(
  lines: ILines,
  copy: boolean = false,
): ILines {
  if (copy) {
    return ['{', ...indentLines(lines, void 0, true), '}'];
  } else {
    indentLines(lines);
    lines.unshift('{');
    lines.push('}');
    return lines;
  }
}

export function linesToString(
  lines: ILines,
): string {
  return lines.join('\n');
}

export function nullIfEmptyLines(
  lines: ILines,
): ILines | null {
  return (lines.length === 0)
    ? null
    : lines;
}


export function optionalLines(
  lines: ILines | null,
): ILines {
  return (lines === null)
    ? []
    : lines;
}




