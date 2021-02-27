## Syntax

### Text: {{ observable }}

```html
{{ observable }}
```

It compiles to something similar to this:

```ts
observable((value) => text.value = value);
```

---

### Attributes

#### Bind: []


##### Bind property: [property]

```html
<input
  [value]="observable"
/>
```

It compiles to something similar to this:

```ts
observable((value) => input.value = value);
```

###### alternative syntax

```html
<input
  bind-value="observable"
/>
```


##### Bind class: [class.class-name]

```html
<div
  [class.my-class]="observable"
></div>
```

It compiles to something similar to this:

```ts
observable((value) => div.classList.toggle('my-class', value));
```

##### Bind class list: [class...]

```html
<div
  [class...]="observable"
></div>
```

It compiles to something similar to this:

```ts
observable((classes) => div.className = classes);
```

###### alternative syntax

```html
<div
  bind-class---="observable"
></div>
```


##### Bind style: [style.style-property]

```html
<div
  [style.font-size]="observable"
></div>
```

It compiles to something similar to this:

```ts
observable((value) => div.style.setProperty('font-size', value));
```

##### Bind style list: [style...]

```html
<div
  [style...]="observable"
></div>
```

It compiles to something similar to this:

```ts
observable((styles) => div.setAttribute('style', styles));
```

###### alternative syntax

```html
<div
  bind-style---="observable"
></div>
```


##### Bind attribute: [attr.name]

```html
<div
  [attr.aria-label]="observable"
></div>
```

It compiles to something similar to this:

```ts
observable((value) => div.setAttribute('aria-label', value));
```

---

#### EventListener: (event-name)

```html
<div
  (click)="observer"
></div>
```

It compiles to something similar to this:

```ts
div.addEventListener('click', observer);
```

###### alternative syntax

```html
<div
  on-click="observer"
></div>
```


#### Reference: #referenceName

```html
<div
  #myDiv
></div>
```

It compiles to something similar to this:

```ts
var myDiv = div;
```

###### alternative syntax

```html
<div
  ref-myDiv
></div>
```

---

### Elements

#### Template: rx-template

```html
<rx-template
  name="templateReference"
  let-var1
  let-var2
>
  ...content
</rx-template>
```

Creates a reusable template.

Attributes:

- `name`: the name of the template
- `let-XXX`: declare a variable for this template


It compiles to something similar to this:

```ts
var templateReference = ({ var1, var2 }): DocumentFragment => content;
```


#### Template injection: rx-inject-template

```html
<rx-inject-template
  template="templateReference"
  let-var1="data1"
  let-var2="data2"
></rx-inject-template>
```

Injects a template into the DOM.

Attributes:

- `template`: the name of the template to inject
- `let-XXX`: the variables to provide to this template

It compiles to something similar to this:

```ts
attachTemplate(templateReference, { var1: data1, var2: data2 }, parentNode);
``` 

#### Dynamic content injection: rx-inject-content

```html
<rx-inject-content 
  content="observable"
></rx-inject-content>
```

Injects dynamically a DocumentFragment into the DOM.
Previously inserted nodes are removed.

Attributes:

- `content`: the SubscribeFunction which emits a DocumentFragment or null

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveContentNode(observable));
``` 


#### Conditional boolean template injection: rx-if or *if

```html
<rx-if
  condition="conditionObservable"
  true="templateReferenceTrue"
  false="templateReferenceFalse"
></rx-if>
```

Creates a virtual Node which:

- subscribes to `conditionObservable`
- and injects `templateReferenceTrue` if it received *true*,
- or injects `templateReferenceFalse` if it received *false*

ℹ️ the previous injected template is removed.

Attributes:

- `condition`: the SubscribeFunction to listen to
- `true`: the name of the template to inject if `condition` emitted *true*
- `false`: the name of the template to inject if `condition` emitted *false*

ℹ️ you may omit one of the template.

It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveIfNode(conditionObservable, templateReferenceTrue, templateReferenceFalse));
```

###### alternative syntax

```html
<tag-mame
  *if="conditionObservable"
  ...otherAttributes
>
  ...content
</tag-mame>
```

Which is equivalent to:

```html
<rx-template
  name="uuid"
>
  <tag-mame 
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-if
  condition="conditionObservable"
  true="uuid"
></rx-if>
```


#### Conditional switch template injection: rx-switch

```html
<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="templateReferenceA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="templateReferenceB"
  ></rx-switch-case>
  <rx-switch-default
    template="templateReferenceC"
  ></rx-switch-default>
</rx-switch>
```

Creates a virtual Node which:

- subscribes to `observable`
- and injects `templateReferenceA`, `templateReferenceB` or `templateReferenceC` according to the received value

ℹ️ the previous injected template is removed.

Attributes:

- rx-switch
  - `expression`: the SubscribeFunction to listen to
- rx-switch-case
  - `case`: the value for this template
  - `template`: the template reference to inject
- rx-switch-default
  - `template`: the template reference to inject

ℹ️ you may omit `rx-switch-default`.

It compiles to something similar to this:

TODO

```ts
nodeAppendChild(parentNode, createReactiveIfNode(conditionObservable, templateReferenceTrue, templateReferenceFalse));
```

###### alternative syntax

```html
<rx-switch
  expression="observable"
>
  <tag-name-a
    *switch-case="valueA"
    ...otherAttributesA
  >
    ...contentA
  </tag-name-a>
  <tag-name-b
    *switch-case="valueB"
    ...otherAttributesB
  >
    ...contentB
  </tag-name-b>
  <tag-name-c
    *switch-default
    ...otherAttributesC
  >
    ...contentC
  </tag-name-c>
</rx-switch>
```

Which is equivalent to:

```html
<rx-template
  name="uuidA"
>
  <tag-mame-a
    ...otherAttributesA
  >
    ...contentA
  </tag-mame-a>
</rx-template>

<rx-template
    name="uuidB"
>
  <tag-mame-b
      ...otherAttributesB
  >
    ...contentB
  </tag-mame-b>
</rx-template>

<rx-template
    name="uuidC"
>
  <tag-mame-c
      ...otherAttributesC
  >
    ...contentC
  </tag-mame-c>
</rx-template>

<rx-switch
  expression="observable"
>
  <rx-switch-case
    case="valueA"
    template="uuidA"
  ></rx-switch-case>
  <rx-switch-case
    case="valueB"
    template="uuidB"
  ></rx-switch-case>
  <rx-switch-default
    template="uuidC"
  ></rx-switch-default>
</rx-switch>
```

#### For loop template injection: rx-for-loop or *for


```html
<rx-for-loop
  items="itemsObservable"
  template="templateReference"
  track-by="trackByFunction"
></rx-for-loop>
```

Creates a virtual Node which:

- subscribes to `itemsObservable`
- and injects the template `templateReference` for each received values

ℹ️ the virtual Node take care to optimize the DOM and the rendering process (re-use nodes if possible).

Attributes:

- `items`: the SubscribeFunction to listen to
- `template`: the name of the template to inject for each values
- `track-by` (optional): a trackByFunction to known which nodes may be re-used


It compiles to something similar to this:

```ts
nodeAppendChild(parentNode, createReactiveForLoopNode(itemsObservable, templateReference, { tackBy: trackByFunction }));
```

###### alternative syntax

```html
<tag-name
  *for="let item of items; index as i; trackBy: trackByFn"
  ...otherAttributes
>
  ...content
</tag-name>
```

Which is equivalent to:

```html
<rx-template
  name="uuid"
  let-index="i"
>
  <tag-mame
    ...otherAttributes
  >
    ...content
  </tag-mame>
</rx-template>

<rx-for-loop
  items="items"
  template="uuid"
  track-by="trackByFn"
></rx-for-loop>
```

#### Virtual container: rx-container

```html
<rx-container>
  ...content
</rx-container>
```

Creates a virtual node to wrap other nodes.

It only accepts `*command` attributes.

*Example:*

```html
a
<rx-container
  *for="let item of of(1, 2, 3)"
>
  {{ of(item) }}
</rx-container>
b
```

Results in:

```html
a
1
2
3
b
```





