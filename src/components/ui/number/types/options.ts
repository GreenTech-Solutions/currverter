export interface INumberControlOptions {
  /**
   * Allow . symbol for decimal
   * f.e. 0.5, 1.5
   * @default false
   */
  dot?: boolean;

  /**
   * Use dynamic width
   * @default false
   */
  autoWidth?: boolean;

  /**
   * Allow leading zeros
   * @default false
   */
  zeros?: boolean;
}
