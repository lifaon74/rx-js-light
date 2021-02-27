import { of } from '../../subscribe-function/from/others/of/of';
import { pipeSubscribeFunction } from '../../functions/piping/pipe-subscribe-function/pipe-subscribe-function';
import { expression } from '../../subscribe-function/from/others/expression';
import { interval } from '../../subscribe-function/from/time-related/interval/interval';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { sourceSubscribePipe } from '../../subscribe-function/subscribe-pipe/source-related/source-subscribe-pipe/source-subscribe-pipe';
import {
  createUnicastReplayLastSource, IUnicastReplayLastSource
} from '../../source/replay-last-source/derived/create-unicast-replay-last-source';
import { compileReactiveHTMLAsModuleWithStats } from '../reactive-html/compiler/to-module/compile-reactive-html-as-module';
import { nodeAppendChild } from '../light-dom/node/move/devired/dom-like/node/node-append-child';
import {
  createMulticastReplayLastSource, IMulticastReplayLastSource
} from '../../source/replay-last-source/derived/create-multicast-replay-last-source';
import { reactiveFunction } from '../../subscribe-function/from/many/reactive-function/reactive-function';
import { mapSubscribePipe } from '../../subscribe-function/subscribe-pipe/emit-pipe-related/map-subscribe-pipe';
import { numberFormatSubscribePipe } from '../../i18n/number-format/number-format-subscribe-pipe/number-format-subscribe-pipe';
import { createLocalesSource } from '../../i18n/locales/create-locales-source';
import { Component } from '../component/component/component-decorator';
import { OnConnect, OnCreate, OnDisconnect } from '../component/component/component-implements';
import { dateTimeShortcutFormatSubscribePipe } from '../../i18n/date-time-format/date-time-shortcut-format/date-time-shortcut-format-subscribe-pipe';
import { IDateTimeShortcutFormat } from '../../i18n/date-time-format/date-time-shortcut-format/date-time-shortcut-format-to-date-time-format-options';
import { DEFAULT_CONSTANTS_TO_IMPORT } from '../reactive-html/constants/default-constants-to-import.constant';
import { DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT } from '../reactive-html/constants/observables/default-observable-constants-to-import.constant';
import { compileReactiveHTMLAsComponentTemplate } from '../component/component-template/compile/compile-reactive-html-as-component-template';
import { IDateTimeFormatValue } from '../../i18n/date-time-format/date-time-format.type';
import { createElementNode } from '../light-dom/node/create/create-element-node';
import { compileReactiveCSSAsComponentStyle } from '../component/component-style/compile/compile-reactive-css-as-component-style';
import { asyncUnsubscribe } from '../../misc/helpers/async-unsubscribe';
import { createSubscribeFunctionProxy, ISubscribeFunctionProxy } from '../../others/create-subscribe-function-proxy';
import { uuid } from '../../misc/helpers/uuid';
import { createDocumentFragment } from '../light-dom/node/create/create-document-fragment';
import { IReactiveContent } from '../reactive-dom/template/reactive-content-node/create-reactive-content-node';
import { IEmitFunction, ISubscribePipeFunction } from '../../types';
import { getFirstElementChild } from '../light-dom/node/properties/get-first-element-child';
import {
  fromEventTarget, fromFetch, fromPromise, ISubscribeFunctionFromFetchNotifications, mergeWithNotifications
} from '../../subscribe-function';
import { ISubscription } from '../../misc/subscription/subscription.type';
import { Subscription } from '../../misc/subscription/subscription-class';
import { IDefaultNotificationsUnion } from '../../misc';
import { mergeMapSubscribePipeWithNotifications } from '../../subscribe-function/subscribe-pipe/merge-all/with-notifications/merge-map/merge-map-subscribe-pipe-with-notifications';
import { fromMatchMedia } from '../../subscribe-function/from/dom/from-match-media/from-match-media';
import { wrapHTMLTemplateForComponentTemplate } from '../component/component-template/misc/wrap-html-template-for-component-template';
import { noCORS } from '../../debug-observables-v5';
import { conditionalSubscribePipe } from '../../subscribe-function/subscribe-pipe/experimental/conditional-subscribe-pipe';
import { SubscriptionManager } from '../../misc/subscription/manager/subscription-manager-class';
import { AppWindowComponent } from './window-component/window.component';


const buttonStyle = `
  min-width: 100px;
  height: 40px;
  font-size: 16px;
  color: black;
  background-color: white;
  border: 1px solid black;
`;

const inputStyle = `
  min-width: 100px;
  height: 40px;
  font-size: 16px;
  color: black;
  background-color: white;
  border: 1px solid black;
`;

async function debugReactiveDOMCompiler1() {

  // const html = `abc`;
  // const html = `{{ $.text }}`;
  // const html = `a {{ $.text }} b`;
  // const html = `<div color="red"></div>`;
  // const html = `<div [title]="$.title">some content</div>`;
  // const html = `<div [attr.id]="$.id"></div>`;
  // const html = `<div [class.class-a]="$.classA"></div>`;
  // const html = `<div [class...]="$.classes"></div>`;
  // const html = `<div [style.font-size]="$.fontSize"></div>`;
  // const html = `<div [style...]="$.style"></div>`;
  // const html = `<div style="width: 500px; height: 500px; background-color: #fafafa" (click)="$.onClick"></div>`;
  // const html = `<div #nodeA></div>`;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-var1
  //     let-var2
  //   >
  //     content
  //   </rx-template>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-text
  //   >
  //     {{ text }}
  //   </rx-template>
  //   <rx-inject-static-template
  //     template="templateReference"
  //     let-text="$.text"
  //   ></rx-inject-static-template>
  // `;

  // const html = `
  //   <rx-template name="templateReference">
  //     <div>
  //       I'm visible
  //     </div>
  //   </rx-template>
  //
  //   <button (click)="$.onClick">
  //     toggle
  //   </button>
  //
  //   <rx-if
  //     condition="$.clickCondition"
  //     true="templateReference"
  //   ></rx-if>
  // `;

  // const html = `
  //   <button (click)="$.onClick">
  //     toggle
  //   </button>
  //   <div *if="$.clickCondition">
  //     I'm visible
  //   </div>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateReference"
  //     let-index="i"
  //     let-item="value"
  //   >
  //     <div>
  //      node #{{ i }} -> {{ value }}
  //     </div>
  //   </rx-template>
  //   <rx-for-loop
  //     items="$.items"
  //     template="templateReference"
  //     track-by="$.trackByFn"
  //   ></rx-for-loop>
  // `;

  // const html = `
  //   <div *for="let item of $.items; index as i; trackBy: $.trackByFn">
  //     node #{{ i }} -> {{ item }}
  //   </div>
  // `;

  // const html = `
  //   <div
  //     color="red"
  //     [title]="$.title"
  //     [attr.id]="$.id"
  //     [class.class-a]="$.classA"
  //     [class...]="$.classes"
  //     [style.font-size]="$.fontSize"
  //     [style...]="$.style"
  //   >
  //     a {{ $.text }} b
  //   </div>
  // `;

  // const html = `
  //   <rx-container *if="$.condition">
  //     a {{ $.text }} b
  //   </rx-container>
  // `;

  // const html = `
  //   <rx-container *for="let item of $.items; index as i; trackBy: $.trackByFn">
  //     node #{{ i }} -> {{ item }}<br>
  //   </rx-container>
  // `;

  // const html = `
  //   <rx-inject-content
  //     content="$.content"
  //   ></rx-inject-content>
  // `;

  // const html = `
  //   <rx-template
  //     name="templateReferenceA"
  //   >
  //     A
  //   </rx-template>
  //
  //   <rx-template
  //     name="templateReferenceB"
  //   >
  //     B
  //   </rx-template>
  //
  //   <rx-template
  //     name="templateReferenceC"
  //   >
  //     C
  //   </rx-template>
  //
  //   <rx-switch
  //     expression="$.switchValue"
  //   >
  //     <rx-switch-case
  //       case="1"
  //       template="templateReferenceA"
  //     ></rx-switch-case>
  //     <rx-switch-case
  //       case="2"
  //       template="templateReferenceB"
  //     ></rx-switch-case>
  //     <rx-switch-default
  //       template="templateReferenceC"
  //     ></rx-switch-default>
  //   </rx-switch>
  // `;


  const html = `
    <rx-switch
      expression="$.switchValue"
    >
      <div
        *switch-case="1"
      >
        A
      </div>
     <div
        *switch-case="2"
      >
        B
      </div>
      <div
        *switch-default
      >
        C
      </div>
    </rx-switch>
  `;

  // const url = `http://info.cern.ch/hypertext/WWW/TheProject.html`;
  // const url = `https://streams.spec.whatwg.org/`;
  // const url = `https://www.w3.org/TR/2021/WD-css-cascade-5-20210119/`;
  // const html = await (await fetch(noCORS(url))).text();

  function $of<GValue>(value: GValue): ISubscribeFunction<GValue> {
    return pipeSubscribeFunction(of<GValue>(value), [
      sourceSubscribePipe<GValue>(() => createUnicastReplayLastSource<GValue>()),
    ]);
  }

  const timer = interval(1000);

  const clickSource = createMulticastReplayLastSource<boolean>();

  const data = {
    title: $of('my-title'),
    id: expression(() => Math.random(), timer),
    classA: expression(() => Math.random() < 0.5, timer),
    classes: $of(['a', 'b']),
    fontSize: expression(() => Math.floor(Math.random() * 20) + 'px', timer),
    style: $of({ color: 'red' }),
    text: expression(() => new Date().toString(), timer),
    onClick: (event: MouseEvent) => {
      console.log('click');
      clickSource.emit(!clickSource.getValue());
    },
    condition: expression(() => Math.random() < 0.5, timer),
    items: $of([1, 2, 3].map($of)),
    trackByFn: (_: any) => _,
    clickCondition: clickSource.subscribe,
    content: $of(compileReactiveHTMLAsComponentTemplate(`
      hello world
    `)({})),
    switchValue: $of(3)
  };

  type GData = typeof data;

  // console.log(compileHTMLAsHTMLTemplate(html).join('\n'));

  // console.time('compilation');
  // const template = compileReactiveHTMLAsComponentTemplate<GData>(html.trim());
  // console.timeEnd('compilation');
  // console.time('injection');
  // const node = template(data);
  // nodeAppendChild(document.body, node);
  // console.timeEnd('injection');

  // console.time('html-injection');
  // document.body.innerHTML = html;
  // console.timeEnd('html-injection');

  /**
   * The raw compiled minified version is around 2 times bigger than the html, and the gzipped version 10% bigger.
   * The compilation of 250K of html takes approximately 200ms (~1250B/ms = 1.25MB/s)
   * The injection of 250K of html takes approximately 80ms
   *
   * @example:  https://www.w3.org/TR/2021/WD-css-cascade-5-20210119/ (250K of html, 43.5k gzipped)
   *
   * compilation: 195.925048828125 ms
   * minification: 2807.080078125 ms
   * - html: 240325
   * - compiled: 2287049 (html: 951%)
   * - minified: 423652 (html: 176%, compiled: 18%) => 48.6K gzipped
   * injection: 79.2978515625 ms
   *
   * aot compilation:
   * - +10% size, but insignificant excess download time (mostly due to awaiting server instead of download time)
   * - wins compiler size and compilation time
   * - potentially less performant if user has a connection lower than 1.25Mb/s (125KB/s) (10% of 1.25MB/s - compile time)
   */
  const componentCode: string = await compileReactiveHTMLAsModuleWithStats(html);
  navigator.clipboard.writeText(componentCode);
  const dataURL: string = `data:application/javascript;base64,${ btoa(unescape(encodeURIComponent(componentCode))) }`;
  const module = await import(dataURL);
  const template = wrapHTMLTemplateForComponentTemplate(module.default, DEFAULT_CONSTANTS_TO_IMPORT);
  console.time('injection');
  const node = template(data);
  nodeAppendChild(document.body, node);
  console.timeEnd('injection');
}


async function debugReactiveDOMCompiler2() {

  const locales = createLocalesSource();


  const inputValue = createMulticastReplayLastSource<string>();

  const inputValueAsNumber = pipeSubscribeFunction(inputValue.subscribe, [
    mapSubscribePipe<string, number>(Number),
  ]);

  const isInvalid = reactiveFunction((value: number): boolean => {
    return Number.isNaN(value);
  }, [
    inputValueAsNumber,
  ]);

  const currencyText = pipeSubscribeFunction(inputValueAsNumber, [
    numberFormatSubscribePipe(locales.subscribe, of({
      style: 'currency',
      currency: 'eur',
    }))
  ]);


  const data = {
    onInputChange(input: HTMLInputElement): void {
      inputValue.emit(input.value);
    },
    inputValue,
    isInvalid,
    currencyText,
    locales,
  };

  const html = `
    <style>
      input {
        border: 1px solid black;
        outline: none;
      }
      input.invalid {
        border-color: red !important;
      }
    </style>
    <input
      #input
      [value]="$.inputValue.subscribe"
      (input)="() => $.onInputChange(input)"
      [class.invalid]="$.isInvalid"
    />
    <div>
      {{ $.currencyText }}
    </div>
    <button (click)="() => $.locales.emit($.locales.getValue().includes('fr') ? 'en' : 'fr')">
      swap locale
    </button>
  `;

  nodeAppendChild(document.body, compileReactiveHTMLAsComponentTemplate(html.trim())(data));

  // const module = compileHTMLAsModule(html).join('\n');
  // console.log(await minify(module));
}


async function debugReactiveDOMCompiler3() {

  const CONSTANTS_TO_IMPORT = {
    ...DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT,
    ...DEFAULT_CONSTANTS_TO_IMPORT,
  };

  const $locales$ = createLocalesSource();

  function setUpAppDateComponent() {
    interface IData {
      date: ISubscribeFunction<string>;
    }

    @Component({
      name: 'app-date',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        {{ $.date }}
      `,
        CONSTANTS_TO_IMPORT
      ),
      style: compileReactiveCSSAsComponentStyle(`
        :host {
          display: inline-block;
        }
      `)
    })
    class AppDateComponent extends HTMLElement implements OnCreate<IData> {
      protected readonly data: IData;
      protected _dateSource: IUnicastReplayLastSource<any>;

      get date(): IDateTimeFormatValue {
        return this._dateSource.getValue();
      }

      set date(value: IDateTimeFormatValue) {
        this._dateSource.emit(value);
      }

      constructor() {
        super();

        this._dateSource = createUnicastReplayLastSource<number>();

        this.data = {
          date: pipeSubscribeFunction(this._dateSource.subscribe, [
            dateTimeShortcutFormatSubscribePipe($locales$.subscribe, of<IDateTimeShortcutFormat>('medium')),
          ]),
        };
      }

      onCreate(): any {
        return this.data;
      }
    }
  }

  function setUpAppMainComponent() {
    interface IData {
      time: ISubscribeFunction<number>;
      count: IMulticastReplayLastSource<number>;

      onClickButton(): void;
    }

    @Component({
      name: 'app-main',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        <div>
          <app-date [date]="$.time"></app-date>
        </div>
        <button
          (click)="$.onClickButton"
        >
          {{ $.count.subscribe }}
        </button>
      `,
        CONSTANTS_TO_IMPORT,
      ),
      style: compileReactiveCSSAsComponentStyle(`
        button:focus { outline: 0; }
      
        :host {
          display: block;
        }
        
        :host > button {
          min-width: 100px;
          height: 40px;
          font-size: 16px;
          color: black;
          background-color: white;
          border: 1px solid black;
        }
      `)
    })
    class AppMainComponent extends HTMLElement implements OnCreate<IData>, OnConnect, OnDisconnect {
      protected readonly data: IData;

      constructor() {
        super();

        this.data = {
          time: pipeSubscribeFunction(interval(1000), [
            mapSubscribePipe<void, number>(() => Date.now()),
          ]),
          count: createMulticastReplayLastSource<number>({ initialValue: 0 }),
          onClickButton: () => {
            this.data.count.emit(this.data.count.getValue() + 1);
          }
        };
      }

      onCreate(): any {
        return this.data;
      }

      onConnect(): void {
        console.log('connected');
      }

      onDisconnect(): void {
        console.log('disconnected');
      }
    }
  }


  setUpAppDateComponent();
  setUpAppMainComponent();

  nodeAppendChild(document.body, createElementNode('app-main'));
}


async function debugReactiveDOMCompiler4() {

  const CONSTANTS_TO_IMPORT = {
    ...DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT,
    ...DEFAULT_CONSTANTS_TO_IMPORT,
  };

  function setUpAppMainComponent() {
    interface IData {
      inputValue: IMulticastReplayLastSource<string>;
      tasks: IMulticastReplayLastSource<string[]>;
      noTasks: ISubscribeFunction<boolean>;

      onInputChange(event: Event): void;

      onSubmitForm(event: Event): void;

      onClickRemoveTask(index: ISubscribeFunction<number>): void;
    }

    @Component({
      name: 'app-main',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        <form
          (submit)="$.onSubmitForm"
        >
          <input
            type="text"
            [value]="$.inputValue.subscribe"
            (input)="$.onInputChange"
          />
          <button
            class="add-task"
            type="submit"
          >
            Add Task
          </button>
        </form>
        
        <div class="no-tasks" *if="$.noTasks">
<!--        <div class="no-tasks" *if="pipe($.tasks.subscribe, [map(_ => _.length === 0)])">-->
<!--        <div class="no-tasks" *if="func(_ => _.length === 0, [$.tasks.subscribe])">-->
          No tasks
        </div>
        
        <ul *if="not($.noTasks)">
          <li class="task" *for="let task of $.tasks.subscribe; index as index">
            <span
              class="remove-icon"
              (click)="() => $.onClickRemoveTask(index)"
            >❌</span>
            <span>{{ of(task) }}</span>
          </li>
        </ul>
        
      `,
        CONSTANTS_TO_IMPORT,
      ),
      style: compileReactiveCSSAsComponentStyle(`
        button:focus { outline: 0; }
        input:focus { outline: 0; }
        * {
           box-sizing: border-box;
        }
        
        :host {
          display: block;
          padding: 20px;
        }
        
        :host button {
          ${ buttonStyle }
        }
        
        :host input {
          ${ inputStyle }
        }
        
        :host .no-tasks {
          padding: 20px;
        }
        
        :host .task > * {
          display: inline-block;
          vertical-align: top;
          line-height: 14px;
          font-size: 14px;
        }
        
        :host .remove-icon {
          user-select: none;
          width: 14px;
          height: 14px;
          margin-right: 5px;
          cursor: pointer;
        }
      `)
    })
    class AppMainComponent extends HTMLElement implements OnCreate<IData> {
      protected readonly data: IData;

      constructor() {
        super();
        const tasks = createMulticastReplayLastSource<string[]>({ initialValue: [] });

        this.data = {
          inputValue: createMulticastReplayLastSource<string>({ initialValue: '' }),
          tasks,
          noTasks: pipeSubscribeFunction(tasks.subscribe, [
            mapSubscribePipe<string[], boolean>((tasks: string[]) => (tasks.length === 0)),
          ]),

          onInputChange: (event: Event) => {
            this.data.inputValue.emit((event.target as HTMLInputElement).value);
          },

          onSubmitForm: (event: Event) => {
            event.preventDefault();
            const value: string = this.data.inputValue.getValue().trim();
            if (value.length !== 0) {
              this.data.tasks.emit(this.data.tasks.getValue().concat([value]));
              this.data.inputValue.emit('');
            }
          },

          onClickRemoveTask: (index: ISubscribeFunction<number>) => {
            const unsubscribe = index((index: number) => {
              asyncUnsubscribe(() => unsubscribe);
              const tasks: string[] = this.data.tasks.getValue();
              tasks.splice(index, 1);
              this.data.tasks.emit(tasks);
            });
          },
        };
      }

      onCreate(): any {
        return this.data;
      }
    }
  }


  setUpAppMainComponent();

  nodeAppendChild(document.body, createElementNode('app-main'));
}


async function debugReactiveDOMCompiler5() {

  const CONSTANTS_TO_IMPORT = {
    ...DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT,
    ...DEFAULT_CONSTANTS_TO_IMPORT,
  };

  function setUpAppMainComponent() {

    interface IProxyData {
      name: string;
      email: string;
      items: string[];
    }

    interface IData {
      data: IMulticastReplayLastSource<IProxyData>;
      proxy: ISubscribeFunctionProxy<IProxyData>;
    }

    @Component({
      name: 'app-main',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        <div>{{ $.proxy.name.$ }}</div>
        <div>{{ $.proxy.email.$ }}</div>
        <div>{{ $.proxy.items.length.$ }}</div>
        <div *for="let item of $.proxy.items.$">
          {{ of(item) }}
        </div>
      `,
        CONSTANTS_TO_IMPORT,
      ),
    })
    class AppMainComponent extends HTMLElement implements OnCreate<IData> {
      protected readonly data: IData;

      constructor() {
        super();
        const _data: IProxyData = {
          name: 'Spongebob',
          email: 'a@b.c',
          items: [],
        };
        const data = createMulticastReplayLastSource<IProxyData>({ initialValue: _data });

        this.data = {
          data,
          proxy: createSubscribeFunctionProxy<IProxyData>(data.subscribe)
        };

        setInterval(() => {
          const _data = data.getValue();
          data.emit({
            ..._data,
            items: _data.items.concat([uuid()])
          });
        }, 1000);

      }

      onCreate(): any {
        return this.data;
      }
    }
  }


  setUpAppMainComponent();

  nodeAppendChild(document.body, createElementNode('app-main'));
}


/**
 * Popups - works !
 */
async function debugReactiveDOMCompiler6() {

  const CONSTANTS_TO_IMPORT = {
    ...DEFAULT_OBSERVABLE_CONSTANTS_TO_IMPORT,
    ...DEFAULT_CONSTANTS_TO_IMPORT,
  };


  function setUpAppMainComponent() {


    abstract class AppPopupComponent<GData extends object> extends HTMLElement {
      public readonly manager: AppPopupManagerComponent;

      protected constructor(
        manager: AppPopupManagerComponent,
      ) {
        super();
        this.manager = manager;
      }

      close(): void {
        this.manager.close(this);
      }
    }

    interface IAppPopupComponentConstructor<GData extends object> {
      new(
        manager: AppPopupManagerComponent,
        data: GData,
      ): AppPopupComponent<GData>;
    }

    /*-----------*/

    interface IData {
      popups: IMulticastReplayLastSource<IPopup[]>;
      onClickPopupContainer: IEmitFunction<MouseEvent>;
    }

    interface IPopup {
      component: AppPopupComponent<any>;
      template: IReactiveContent;
    }


    @Component({
      name: 'app-popup-manager',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        <div
          class="popup-container"
          *for="let popup of $.popups.subscribe"
          (click)="$.onClickPopupContainer"
          [class.visible]="idle()"
        >
          <rx-inject-template
            template="popup.template"
          ></rx-inject-template>
         </div>
      `,
        CONSTANTS_TO_IMPORT,
      ),
      style: compileReactiveCSSAsComponentStyle(`
        * {
           box-sizing: border-box;
        }
        
        :host {
          display: block;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        :host > * {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          overflow: auto;
          padding: 10px;
          opacity: 0;
          transition: opacity 100ms;
        }
        
        :host > * > * {
          display: block;
          margin: 100px auto 0;
          background-color: white;
          max-width: 600px;
          padding: 20px;
          border-radius: 5px;
          transition: transform 100ms;
          transform: translateY(100px);
        }
        
        :host:not(.visible) {
           display: none;
        }
        
        :host > .visible {
           opacity: 1;
        }
        
        :host > .visible > * {
          transform: translateY(0);
        }
      `)
    })
    class AppPopupManagerComponent extends HTMLElement implements OnCreate<IData>, OnConnect, OnDisconnect {
      protected readonly data: IData;
      protected readonly isVisibleSubscription: ISubscription<boolean>;

      constructor() {
        super();
        const popups: IMulticastReplayLastSource<IPopup[]> = createMulticastReplayLastSource<IPopup[]>({ initialValue: [] });
        this.data = {
          popups,
          onClickPopupContainer: (event: MouseEvent): void => {
            if (event.currentTarget === event.target) {
              this.close(getFirstElementChild<AppPopupComponent<any>>(event.target as Element) as AppPopupComponent<any>);
            }
          },
        };

        this.isVisibleSubscription = new Subscription(
          pipeSubscribeFunction(popups.subscribe, [
            mapSubscribePipe<IPopup[], boolean>((popups: IPopup[]) => (popups.length > 0)),
          ]),
          (isVisible: boolean) => {
            this.classList.toggle('visible', isVisible);
          }
        );
      }

      open<GData  extends object>(
        component: IAppPopupComponentConstructor<GData>,
        data: GData,
      ): AppPopupComponent<GData> {

        const fragment: DocumentFragment = createDocumentFragment();
        const popup: AppPopupComponent<GData> = new component(this, data);
        nodeAppendChild(fragment, popup);

        const popups: IPopup[] = this.data.popups.getValue();

        popups.push({
          component: popup,
          template: of(fragment),
        });

        this.data.popups.emit(popups);

        return popup;
      }

      close(
        component: AppPopupComponent<any>,
      ): void {
        const index: number = this._getPopupIndex(component);
        if (index === -1) {
          throw new Error(`Not a popup of this manager`);
        } else {
          this._close(index);
        }
      }

      onCreate(): any {
        return this.data;
      }

      onConnect(): void {
        console.log('connected');
        this.isVisibleSubscription.activate();
      }

      onDisconnect(): void {
        this.isVisibleSubscription.deactivate();
      }

      protected _getPopupIndex(
        component: AppPopupComponent<any>,
      ): number {
        return this.data.popups.getValue().findIndex((popup: IPopup) => {
          return popup.component === component;
        });
      }

      protected _close(
        index: number,
      ): void {
        const popups: IPopup[] = this.data.popups.getValue();
        popups.splice(index, 1);
        this.data.popups.emit(popups);
      }
    }

    /*-----------*/

    @Component({
      name: 'app-popup-hello-world',
      template: compileReactiveHTMLAsComponentTemplate<IData>(`
        hello world
      `,
        CONSTANTS_TO_IMPORT,
      ),
    })
    class AppPopupHelloWorldComponent extends AppPopupComponent<any> {
      constructor(
        manager: AppPopupManagerComponent,
        data: any,
      ) {
        super(manager);
        console.log(data);
      }
    }


    /*-----------*/

    const manager = new AppPopupManagerComponent();
    nodeAppendChild(document.body, manager);

    fromEventTarget(document.body, 'click')((event: Event) => {
      if (event.currentTarget === event.target) {
        manager.open(AppPopupHelloWorldComponent, {
          a: 'a',
        });
      }
    });

    // manager.open(AppPopupHelloWorldComponent, {
    //   a: 'a',
    // });
  }


  setUpAppMainComponent();



}

/**
 * Lazy loaded images - wip
 */
async function debugReactiveDOMCompiler7() {

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source

  type IResourceNotification = IDefaultNotificationsUnion<Blob>;
  type IResourceLoader = ISubscribeFunction<IResourceNotification>;

  function parallelResourcesLoader(
    resources: readonly IResourceLoader[],
  ): IResourceLoader {
    return mergeWithNotifications(resources, { errorOnFirstError: false, completeOnFirstComplete: true });
  }

  function httpResourceLoader(
    src: string,
  ): IResourceLoader {
    return pipeSubscribeFunction(fromFetch(src), [
      mergeMapSubscribePipeWithNotifications<ISubscribeFunctionFromFetchNotifications, Blob>((response: Response) => fromPromise(response.blob()))
    ]);
  }

  function imageLoader(
    src: string,
  ): IResourceLoader {
    return httpResourceLoader(src);
  }

  // INFO stopped there
  function matchesMedia<GValue>(
    query: string,
  ): ISubscribePipeFunction<GValue, GValue> {
    return conditionalSubscribePipe<GValue>(fromMatchMedia(query));
  }

  // function supportsType(
  //   src: string,
  // ): IResourceLoader {
  //   return httpResourceLoader(src);
  // }


  @Component({
    name: 'app-image',
  })
  class AppImageComponent extends HTMLElement {
    public readonly load: IResourceLoader;

    constructor(
      loader: IResourceLoader,
    ) {
      super();
      this.load = loader;
    }
  }


  const img = new AppImageComponent(parallelResourcesLoader([
    pipeSubscribeFunction(imageLoader(noCORS('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/Sample-image10-highres.jpg')), [
      matchesMedia<IResourceNotification>('(max-width: 600px)'),
    ]),
    // imageLoader(noCORS('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/sample_07_0.jpg')),
    // imageLoader(noCORS('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/Sample%202_0.jpg')),
  ]));


  img.load((value: any) => {
    console.log(value);
  });

  // nodeAppendChild(document.body, img);

  fromMatchMedia('(max-width: 600px)')((value: boolean) => {
    console.log('changed', value);
  });
  //
  // fromResizeObserver(document.body)((value: ResizeObserverEntry) => {
  //   console.log('resized', value);
  // });
}

// async function debugReactiveDOMCompiler7() {
//
//   interface IOptionsWithAbortSignal {
//     signal?: AbortSignal;
//   }
//
//   interface IResourceLoader<GOptions extends IOptionsWithAbortSignal = IOptionsWithAbortSignal> {
//     (options?: GOptions): Promise<Blob>;
//   }
//
//   // class ResourcesLoader {
//   //   protected _resources: readonly IResourceLoader[];
//   //
//   //   constructor(
//   //     resources?: Iterable<IResourceLoader>,
//   //   ) {
//   //     this._resources = [];
//   //     if (resources !== void 0) {
//   //       this.setResources(resources)
//   //     }
//   //   }
//   //
//   //   getResources(): readonly IResourceLoader[] {
//   //     return this._resources;
//   //   }
//   //
//   //   setResources(resources: Iterable<IResourceLoader>): void {
//   //     this._resources = Array.from(resources);
//   //   }
//   //
//   //   load(options?: IOptionsWithAbortSignal): Promise<Blob> {
//   //     return this._resources.reduce<Promise<Blob>>((promise: Promise<Blob>, resourceLoader: IResourceLoader): Promise<Blob> => {
//   //       return promise.catch(wrapFunctionWithOptionalAbortSignalAndThrow(() => {
//   //         return resourceLoader(options);
//   //       }, options?.signal))
//   //     }, Promise.reject(new Error(`No ressources`)));
//   //   }
//   // }
//
//   function sequentialResourcesLoader(
//     resources: Pick<IResourceLoader[], 'reduce'>,
//   ): IResourceLoader {
//     return (options?: IOptionsWithAbortSignal): Promise<Blob> => {
//       return resources.reduce<Promise<Blob>>((promise: Promise<Blob>, resourceLoader: IResourceLoader): Promise<Blob> => {
//         return promise.catch(wrapFunctionWithOptionalAbortSignalAndThrow(() => {
//           return resourceLoader(options);
//         }, options?.signal))
//       }, Promise.reject(new Error(`No ressources`)));
//     }
//   }
//
//   function httpResourceLoader(
//     src: string,
//   ): IResourceLoader {
//     return (options?: IOptionsWithAbortSignal): Promise<Blob> => {
//       return fetch(src, options)
//         .then(wrapFunctionWithOptionalAbortSignalAndThrow((response: Response) => {
//           return response.blob();
//         }, options?.signal));
//     };
//   }
//
//   function imageLoader(
//     src: string,
//   ): IResourceLoader {
//     return httpResourceLoader(src);
//   }
//
//   function matchesMedia(
//     load: IResourceLoader,
//   ): IResourceLoader {
//     const mediaQueryList = window.matchMedia('(max-width: 600px)');
//     return (options?: IOptionsWithAbortSignal): Promise<Blob> => {
//       if (mediaQueryList.matches) {
//         return load(options);
//       } else {
//         throw new Error(`Doesn't match media`);
//       }
//     };
//   }
//
//   function supportsType(
//     src: string,
//   ): IResourceLoader {
//     return httpResourceLoader(src);
//   }
//
//
//   @Component({
//     name: 'app-image',
//   })
//   class AppImageComponent extends HTMLElement {
//     public readonly load: IResourceLoader;
//
//     constructor(
//       loader: IResourceLoader,
//     ) {
//       super();
//       this.load = loader;
//     }
//   }
//
//
//   const img = new AppImageComponent(sequentialResourcesLoader([
//     imageLoader('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/Sample-image10-highres.jpg'),
//     imageLoader('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/sample_07_0.jpg'),
//     imageLoader('https://www.roadrunnerrecords.com/sites/g/files/g2000005056/f/Sample%202_0.jpg'),
//   ]));
//
//   console.log(await img.load());
//
//   nodeAppendChild(document.body, img);
// }

// const left = createMulticastReplayLastSource({ initialValue: 0 });
// const left = createMulticastReplayLastSource({ initialValue: 0 });
// const left = createMulticastReplayLastSource({ initialValue: 0 });
// const left = createMulticastReplayLastSource({ initialValue: 0 });


/**
 * Window
 */
async function debugReactiveDOMCompiler8() {

  const win = new AppWindowComponent();
  nodeAppendChild(document.body, win);

  // win.subscribeRight((value: number) => {
  //   console.log('right', value);
  // });


  (window as any).win = win;
}

/*----*/


export async function debugReactiveDOMCompiler() {
  // await debugReactiveDOMCompiler1();
  // await debugReactiveDOMCompiler2();
  // await debugReactiveDOMCompiler3();
  // await debugReactiveDOMCompiler4();
  // await debugReactiveDOMCompiler5();
  // await debugReactiveDOMCompiler6();
  // await debugReactiveDOMCompiler7();
  await debugReactiveDOMCompiler8();
}
