# Checkbox

http://element.eleme.io/#/en-US/component/checkbox#checkbox

```html
   <el-checkbox v-model="checked">Option</el-checkbox>
```

## Disabled

```html
    <el-checkbox v-model="checked1" disabled>Option</el-checkbox>
    <el-checkbox v-model="checked2" disabled>Option</el-checkbox>
```

```js
export default {
  data() {
    return {
      checked1: false,
      checked2: true
    }
  }
}
```

## Check list

```html
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="Option A"></el-checkbox>
      <el-checkbox label="Option B"></el-checkbox>
      <el-checkbox label="Option C"></el-checkbox>
      <el-checkbox label="disabled" disabled></el-checkbox>
      <el-checkbox label="selected and disabled" disabled></el-checkbox>
    </el-checkbox-group>
```

```js
export default {
  data() {
    return {
      checkList: ['selected and disabled', 'Option A']
    }
  }
}
```

## Check Group

```html
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup2" size="medium">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup3" size="small">
        <el-checkbox-button v-for="city in cities" :label="city" :disabled="city === 'Beijing'" :key="city">\{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">\{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
```

```js
const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

export default {
  data() {
    return {
      checkboxGroup1: ['Shanghai'],
      checkboxGroup2: ['Shanghai'],
      checkboxGroup3: ['Shanghai'],
      checkboxGroup4: ['Shanghai'],
      cities: cityOptions
    }
  }
}
```

## With Borders

```html
    <div>
      <el-checkbox v-model="checked3" label="Option1" border></el-checkbox>
      <el-checkbox v-model="checked4" label="Option2" border></el-checkbox>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox v-model="checked5" label="Option1" border size="medium"></el-checkbox>
      <el-checkbox v-model="checked6" label="Option2" border size="medium"></el-checkbox>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup5" size="small">
        <el-checkbox label="Option1" border></el-checkbox>
        <el-checkbox label="Option2" border disabled></el-checkbox>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup6" size="mini" disabled>
        <el-checkbox label="Option1" border></el-checkbox>
        <el-checkbox label="Option2" border></el-checkbox>
      </el-checkbox-group>
    </div>
```

 ```js
  export default {
    data () {
      return {
        checked3: true,
        checked4: false,
        checked5: false,
        checked6: true,
        checkboxGroup5: [],
        checkboxGroup6: []
      };
    }
  }
```
