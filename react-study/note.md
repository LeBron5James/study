# React-study

##### 一、安装与创建react项目

1. ​	全局安装create-react-app

   ```
   npm install -g create-react-app
   create-react-app mytsapp --template typescript
   ```

2. 创建项目

   ```
   create-react-app '项目名'
   ```

3. 项目结构：

   > ├── README.md 使用方法的文档
   >

   > ├── node_modules 所有的依赖安装的目录
   >

   > ├── package-lock.json 锁定安装时的包的版本号,保证团队的依赖能保证一致。
   >

   > ├── package.json
   >

   > ├── public 静态公共目录
   >

   > └── src 开发用的源代码目录

4. ==扩展==：使用nrm 切换淘宝镜像  

   ```
   nrm ls
   nrm use taobao
   ```

##### 二、ref、state

1. JSX —使用react构造组件，bable进行编译—> JavaScript对象 — ReactDOM.render() —>DOM

   元素 —>插入页面

2. ==ref的使用==：**改变 ref 不会触发重新渲染**

   ```
   //创建
   const ref = useRef(initialValue)
   //获取
   const value = ref.current
   ```

3. ==**state与setState**==：

   1. 使用useState创建状态：

      ```
       // 初始化状态 count，以及用于更新状态的函数 setCount
        const [count, setCount] = useState(0);
      ```

   2. 更新状态：

      ```
      setCount(count + 1); // 更新状态
      ```

      使用`setState`函数来更新状态。它接受一个新的值作为参数，并触发组件重新渲染。在**类组件**中，`setState`是异步的，但在函数式组件中，由于函数组件的每次渲染都是独立的，所以`setState`是同步的。

   3. `useState`还可以接受一个函数作为参数，用于在更新状态时进行计算。这在涉及先前状态的更新时很有用，因为状态更新是异步的，这样可以确保基于最新的状态进行计算。

      ```
      setCount((prevCount) => prevCount + 1); // 使用函数式更新
      ```

4. 动态渲染

   1. 通过map()方法

      ```
      list.map((item,index)=>{
       	<li key={index}>{item} - {index}</li>
        }
      );
      ```

      key作为唯一标识，不可缺少

##### 三、组件通信

1. ==**组件传值**==：

   1. **`props`**：`props`（即属性）是一种用于从父组件向子组件传递数据的机制。通过使用`props`，可以将任意类型的数据（如字符串、数字、对象、函数等）从一个组件传递到另一个组件，并在接收组件中使用这些数据。

      - **传递 Props：** 在父组件中，通过在子组件标签上添加属性来传递数据。

        ```
         <ChildComponent message={message} />;
        ```

      - **接收 Props：** 在子组件中，可以通过函数参数的形式接收`props`。

        ```
        <p>{props.message}</p>;
        ```

   2. **`Context`**:`Context`（上下文）是一种用于在组件树中共享数据的机制。可以在组件之间传递数据，而不需要显式地通过组件的嵌套来传递。

      `Context`主要由两个部分组成：`Context.Provider`（提供者）和`Context.Consumer`（消费者）。

      - **创建 Context：**

        ```
        const MyContext = React.createContext();
        ```

      - **使用 Provider 提供数据：**使用`Context.Provider`在组件树的某个位置提供数据，然后所有处于该`Context.Provider`内的组件都可以访问该数据。

        ```
        function App() {
          return (
            <MyContext.Provider value="Hello from Context">
              <ChildComponent />
            </MyContext.Provider>
          );
        }
        ```

      - **使用 Consumer 消费数据：**

        ```
        function ChildComponent() {
          return (
            <MyContext.Consumer>
              {value => <p>{value}</p>}
            </MyContext.Consumer>
          );
        }
        ```

      - **使用 useContext Hook:**

        ```
         const value = useContext(MyContext);
        ```

   3. `中间人模式--状态提升`：在公共父组件设置state，在子组件进行state操作函数的调用

   4. `订阅与发布模式`：

      - 创建订阅与发布的钩子

      ```
      var bus = {
          list: [],
          // 订阅
          subscribe(callback) {
              this.list.push(callback)
          },
          // 发布
          publish(text) {
              // 遍历所有的list，将回调函数执行
              this.list.forEach(callback => {
                  callback && callback(text)
              })
          }
      }
      ```

      - 在子组件订阅与发布

        ```
        //发布者
        bus.publish(text);
        //订阅者
         bus.subscribe((info) =>{
           this.setState({
              info
           })
        })
        ```

      - ==*发布者要比订阅者更晚发布*==

   5. 插槽

   6. redux

##### 四、生命周期

1. 生命周期

   - ==挂载阶段==
     - `constructor`:构造函数，在组件被创建时调用，可以在这里进行初始化和状态设置。
     - `static getDerivedStateFromProps()`:在组件实例化之后、props改变之前调用，可以用于根据新的`props`更新组件的`state`。
     - `render()`：在此阶段，将构建并返回组件的虚拟DOm树。
     - `componentDidMount()`：组件被插入到DOM树后调用，可以在这里进行网络请求、订阅等操作。可以进行 DOM 操作，比如设置焦点、添加事件监听器等。可以进行第三库的的初始化
   - ==更新阶段==
     - `static getDerivedStateFromProps()`：类似于挂载阶段，用于根据新的`props`更新组件的`state`。
     - `shouldComponentUpdate()`：用于确定是否需要重新渲染组件。==*性能优化函数*==
     - `render()`：重新构建并返回组件的虚拟DOM树。
     - `getSnapshotBeforeUpdate()`：在更新DOM之前获取当前的DOM状态。`getSnapshotBeforeUpdate()` 返回的值将作为第三个参数传递给 `componentDidUpdate()`。
     - `componentDidUpdate()`：组件更新后调用，可以在这里处理更新后的DOM，进行一些副作用操作，如处理 DOM、执行网络请求、订阅事件等。`componentDidUpdate()` 可能会被多次调用，因此在其中进行的操作应该是幂等的，不会引起额外的副作用。
   - ==卸载阶段==
     - `componentWillUnmount()`：在组件从DOM中移除之前调用。可以在这里进行清理工作，例如取消网络请求，取消订阅等操作。
   - ==错误处理阶段==
     - `static getDerivedStateFromError()`：当子组件抛出错误时被调用，用于更新组件状态。
     - `componentDidCatch()`：捕获并处理子组件中的错误，可用于记录错误信息等操作。

##### 五、Hooks

1. ==**hooks**==

   - `useEEffect()`：用于在函数式组件中处理副作用操作。

     - 副作用操作通常包括数据获取、订阅事件、DOM 操作、动画等。
     - 处理组件卸载时的清理操作。用于在函数式组件中处理副作用操作。
     - 传递两个参数：==第一个参数是一个函数==，用于定义副作用操作。==第二个参数==，它是一个数组，称为依赖项数组。只有当依赖项发生变化时，副作用操作才会执行。如果省略依赖项数组，副作用操作将在每次组件渲染时都执行。

     ```
     useEffect(() => {
     //副作用操作
         const interval = setInterval(() => {
           setSeconds(prevSeconds => prevSeconds + 1);
         }, 1000);
     //清理操作
         return () => {
           clearInterval(interval);
         };
       }, []);
     ```

   - `useCallback()`用于优化函数的性能，特别是在处理传递给子组件的回调函数时。它可以帮助你避免在每次组件重新渲染时创建新的回调函数实例，从而减少不必要的重复渲染。

     ```
     const memoizedCallback = useCallback(callback, dependencies);
     callback 是要进行优化的函数。
     dependencies 是一个依赖项数组，当数组中的值发生变化时，useCallback 会返回一个新的函数。如果省略依赖项数组，每次渲染都会返回相同的函数。
     ```

   - `useMemo()`：用于对值进行记忆（缓存），从而避免在每次组件重新渲染时重复计算相同的值。它可以帮助你优化函数的性能，特别是在计算开销较大的值时。

     ```
     const memoizedValue = useMemo(() => calculateValue(dependencies), dependencies);
     calculateValue 是要进行计算的函数。
     dependencies 是一个依赖项数组，当数组中的值发生变化时，useMemo 会重新计算值。如果省略依赖项数组，每次渲染都会重新计算值。
     ```

   - `useReducer()`：，用于管理和处理复杂的状态逻辑。它类似于 Redux 中的 reducer 概念，帮助你更好地组织和管理组件的状态，并将状态的更新逻辑集中在一个地方。

     ```
     const [state, dispatch] = useReducer(reducer, intialSate);
     reducer 是一个函数，用于定义状态更新的逻辑。
     intialSate 是状态的初始值。
     
     // 处理函数
     const reducer = (prevState, action) => {
         let newState = { ...prevState }
         switch (action.type) {
             case "minus":
                 newState.count--
                 return newState
             case "add":
                 newState.count++
                 return newState
             default:
                 return prevState
         }
     }
     
     // 外部对象  --初始状态
     const intialSate = {
         count: 0
     }
     ```

   - 自定义hook函数：

     - 钩子函数的名称应以 "use" 开头，以便 React 能够正确识别它是一个钩子函数。
     - 钩子函数本质上是一个函数，可以在其中使用其他钩子，如 `useState`、`useEffect` 等。
     - 钩子函数可以返回任何你需要的值，通常是状态、函数或其他有用的信息。

     ```
     function useFilter(cinemaList, mytext) {
         const getCinemaList = useMemo(() => {
             return cinemaList.filter(item => item.name.toUpperCase().includes(mytext.toUpperCase()) ||
                 item.address.toUpperCase().includes(mytext.toUpperCase())
             )
         }, [cinemaList, mytext]);
     
         return { getCinemaList }
     }
     ```

##### 六、路由

1. 路由

   1. 安装 React Router：

      ```
      npm install react-router-dom
      ```

   2. 使用 `BrowserRouter` 组件来包裹应用程序：

      ```
      <BrowserRouter>
         <IndexRouter></IndexRouter>
      </BrowserRouter>
      ```

   3. 配置路由 在IndexRouter.js文件中

      ```
      
          const element = useRoutes([
              {
                  path: "/films",
                  //路由懒加载
                  element: LazyLoad("Films"),
                  //子路由
                  children: [
                      {
                          path: "show",
                          element: LazyLoad("films/Show")
                      },
                      {
                          path: "release",
                          element: LazyLoad("films/Release")
                      },
                      {
                          path: "/films",
                          element: <Navigate to="show" replace />
                      }
                  ]
              },
              //路由拦截
              {
                  path: "/center",
                  element: <PrivateRoute element={LazyLoad("Center")} />
              },
              //动态路由
              {
                  path: "/detail/:id",
                  element: LazyLoad("films/Detail")
              },
              //路由重定向
              {
                  path: "/",
                  element: <Navigate to="/films" replace />
              },
              //配置404界面
              {
                  path: "*",
                  element: LazyLoad("NotFound")
              }
      
          ])
      
      ```

   4. 配置路由懒加载

      ```
      // 路由懒加载
      const LazyLoad = (path) => {
      //导入组件路径
        const Comp = React.lazy(() => import(`../views/${path}`))
        return (
          <React.Suspense fallback={<>加载中...</>}>
            <Comp />
          </React.Suspense>
        )
      }
      ```

   5. 配置路由拦截

      ```
      // 路由组件的拦截
      function isAuth() {
          return localStorage.getItem("token");
      }
      function PrivateRoute({ path, element }) {
          return isAuth() ? element : <Navigate to="/login" replace />;
      }
      ```


##### 七、redux

1. redux

   1. **安装 Redux：**

      ```
      npm install redux react-redux
      nom install @reduxjs/toolkit
      ```

   2. **创建 Redux Store**

      ```
      import { configureStore  } from '@reduxjs/toolkit'
      
      export default configureStore({
          reducer: rootReducer
      })
      ```

   3. **定义 Reducer：**Reducer 是一个纯函数，用于定义应用程序状态的变化。它接收当前状态和一个操作对象，然后返回新的状态。

      ```
      const showTabReducer = (state = {
          show: true,
      }, action) => {
          let newState = { ...state };
          switch (action.type) {
              case "HIDETAB":
                  newState.show = false
                  return newState;
              case "SHOWTAB":
                  newState.show = true
                  return newState;
              default:
                  return state
          }
      }
      export default showTabReducer
      ```

   4. **将 Reducer 组合为 Root Reducer：**如果应用中有多个 Reducer，你需要将它们组合为一个根 Reducer。

      ```
      import { combineReducers } from "redux";
      
      // 根 reducer 是 Redux 中管理状态的核心概念之一
      const rootReducer = combineReducers({
          showTab: showTabReducer,
          changeCity: cityReducer,
          cinemas: cinemasReducer
      })
      ```

   5. **将 Redux Store 连接到 React 组件：**使用 `react-redux` 库的 `Provider` 组件将 Redux Store 连接到整个 React 应用。

      ```
      <Provider store={store}>
            <App />
      </Provider>
      ```

   6. **在组件中使用 Redux 状态：**

      1. 使用 `connect` 函数将 Redux Store 中的状态和操作映射到 React 组件的 props

         ```
         在Cinemas组件中
         
         // 参数一：将来给孩子传的属性，参数二：将来给孩子传的回调函数
         export default connect(mapStateToProps, mapDispatchToProps)(Cinemas)
         ```

      2. 使用钩子函数useDispatch

      ```
      import { useDispatch } from 'react-redux';
      
      const dispatch = useDispatch();
      
          useEffect(() => {
              dispatch(hide());
              return () => {
                  dispatch(show());
              }
          }, [dispatch])
      
      ```

   7. 处理异步操作的 Redux 中间件

      1. 安装`redux-promise`

         ```
         npm i redux-promise
         ```

      2. 在 Redux 的 `store` 配置中应用 `redux-promise`：

         ```
         export default configureStore({
             reducer: rootReducer,
             middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxPromise) 
                 // 将 redux-promise 中间件添加到 middleware 中
         })
         ```

      3. 创建一个异步的 action，使用 `redux-promise` 支持的形式：

         ```
         async function getCinemas() {
             let list = await axios({
                 url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7406159",
                 method: "get",
                 headers: {
                     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16395416565231270166529","bc":"110100"}',
                     'X-Host': 'mall.film-ticket.cinema.list'
                 }
             }).then(res => {
                 return {
                     type: "CHANGELIST",
                     payload: res.data.data.cinemas
                 }
             })
             return list
         }
         
         export default getCinemas
         ```

   8. ==**redux持久化**==

      1. Redux 持久化是一种将 Redux store 中的状态保存到持久化存储（如浏览器的本地存储或会话存储）中，以便在页面刷新或关闭后能够保留状态并在重新加载页面时重新加载。

      2. 安装 `redux-persist` 和相关依赖：

         ```
         npm install redux-persist
         ```

      3. 在store 配置中，导入 `persistReducer` 和 `persistStore`，并使用它们来创建持久化的 reducer 和 store：

         ```
         import { persistStore, persistReducer } from 'redux-persist'
         import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
         
         const persistConfig = {
             key: 'root', // 在存储中的 key
             storage, // 使用的存储引擎，默认为 localStorage
             whitelist: ['changeCity'], // 需要持久化的状态
         };
         
         const persistedReducer = persistReducer(persistConfig, rootReducer);
         
         
         const store = configureStore({
             reducer: persistedReducer,//持久化后的reducer
             middleware: (getDefaultMiddleware) => 	                     				        getDefaultMiddleware().concat(reduxPromise) 
           });
         
         const persistor = persistStore(store); // 创建 persistor
         
         export { store, persistor };
         ```

      4. 使用 `persistor` 来包裹你的应用程序组件，以便在需要时进行持久化存储

         ```
         import { store, persistor } from './08-react-redux/redux/store'
         import { Provider } from 'react-redux';
         import { PersistGate } from 'redux-persist/integration/react';
         
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
               <App />
            </PersistGate>
         </Provider>
         ```

​	
