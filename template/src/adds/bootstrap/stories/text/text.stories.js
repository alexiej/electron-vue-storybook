import { storiesOf } from '@storybook/vue'
import { withDocs } from 'storybook-readme'

import index from './index.vue'
import indexMD from './index.md'

storiesOf('Bootstrap', module)
  .add('Text', withDocs(indexMD, () => ({
    components: {index},
    template: `<index/>`
  })))
