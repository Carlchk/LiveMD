
function Footer() {
    return (<footer class="bg-white dark:bg-gray-800 w-full py-8">
        <div class="max-w-screen-xl mx-auto px-4">
            {/* <ul class="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between">
                <li class="my-2">
                    <a class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                        FAQ
                    </a>
                </li>
                <li class="my-2">
                    <a class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                        Configuration
                    </a>
                </li>
                <li class="my-2">
                    <a class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                        Github
                    </a>
                </li>
                <li class="my-2">
                    <a class="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200" href="#">
                        LinkedIn
                    </a>
                </li>
            </ul> */}
            {/* <div class="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
                <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                    <div class=" relative ">
                        <input type="text" id="&quot;form-subscribe-Subscribe" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email" />
                    </div>
                    <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                        Subscribe
                    </button>
                </form>
            </div> */}
            <div class="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
                {"Made with ❤️ by "}
                <a className="ml-2" href="https://github.com/carlchk"> Carl Chan</a>.
            </div>
        </div>
    </footer>
    )
}

export default Footer;