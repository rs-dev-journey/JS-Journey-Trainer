export interface ElementOptions<T extends keyof HTMLElementTagNameMap> {
  textContent?: string;
  classList?: string[];
  attributes?: Partial<HTMLElementTagNameMap[T]>;
  children?: Node[];
}
