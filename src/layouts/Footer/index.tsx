/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-29 18:27:36
 * @LastEditTime: 2022-08-08 15:30:35
 */
import { defineComponent } from "vue";

export default defineComponent({
    name: "Footer",
    setup() {
        return function () {
            return (
                <footer class="footer footer-center p-4 bg-base-300 text-base-content">
                    <div>
                        <p class="text-center">Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
                    </div>
                </footer>
            )
        }
    }
})