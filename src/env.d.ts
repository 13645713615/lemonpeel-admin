/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-08-03 11:45:57
 * @LastEditTime: 2022-08-03 11:45:58
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-18 11:30:27
 * @LastEditTime: 2022-03-30 11:32:02
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

