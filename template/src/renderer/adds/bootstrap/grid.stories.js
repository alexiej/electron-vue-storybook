import { storiesOf } from '@storybook/vue'
import { withDocs } from 'storybook-readme'

import BootstrapDiv from './bootstrap-div.vue'
import gridMD from './grid.md'

storiesOf('Bootstrap', module).add('Bootstrap GRID', withDocs(gridMD, () => ({
  components: {BootstrapDiv},
  template: `
 <bootstrap-div class="red container p-4">
 
  <bootstrap-div class="blue row">
    <bootstrap-div class="blue col">
      One of three columns One of three columns One of three columns One of three columns One of three columns 
    </bootstrap-div>
    <bootstrap-div class="blue col-2">
      One of three columns
    </bootstrap-div>
    <bootstrap-div class="blue col">
      One of three columns
    </bootstrap-div>
  </bootstrap-div>

  <bootstrap-div class="blue row mt-2">
  <bootstrap-div class="blue col">
    1 of 2
  </bootstrap-div>
  <bootstrap-div class="blue col">
    2 of 2
  </bootstrap-div>

</bootstrap-div>
</bootstrap-div>
    `
})))
