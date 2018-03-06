import { storiesOf } from '@storybook/vue'
import { withDocs } from 'storybook-readme'

import cssGrid from './cssgrid.vue'
import cssgridMD from './grid.md'

storiesOf('Bootstrap', module).add('CSS GRID', withDocs(cssgridMD, () => ({
  components: {cssGrid},
  template: `
 <css-grid/>
    `
})))
