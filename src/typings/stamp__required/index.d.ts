
declare module '@stamp/required' {
  import { Stamp } from '@stamp/compose'
  import stampit from '@stamp/it'
  interface StampMethodRequired {
      (this: Stamp | void, settings: stampit.Composable): Stamp|stampit.Composable;
  }
  export const required: StampMethodRequired
}
