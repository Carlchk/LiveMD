import Logo from './component/Logo.svg'

function NonLoginPage() {
    return (
        <div class="max-w-7xl mx-auto px-8 py-1">
            <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
                <div class="container mx-auto px-6 flex relative py-16">
                    <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                        <div class="panel panel-default py-4">
                            <h1 class="font-bebas-neue text-5xl sm:text-5xl font-black flex flex-col leading-none dark:text-white text-gray-800 py-8">
                                <img src={Logo} className="App-logo" alt="logo" height="16" />
                            </h1>
                            <p class="text-lg sm:text-lg text-gray-700 dark:text-white">
                                Create and collaborate a markdown in real-time.
                            </p>
                        </div>

                        <div class="flex mt-8">
                            <a href="/files" class="py-2 px-4 rounded-lg bg-blue-500 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-400">
                                Go to LiveMD
                            </a>
                            <a href="/files" class="py-2 px-4 rounded-lg bg-transparent border-2 border-blue-500 text-blue-500 dark:text-white hover:bg-blue-500 hover:text-white text-md">
                                Get Started
                            </a>
                        </div>
                    </div>
                    {/* <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                        <img src="https://www.drupal.org/files/project-images/editor.md_.png" class="max-w-xs md:max-w-sm ml-auto object-contain"  />
                    </div> */}
                </div>
            </div>
            {/* <section class="bg-white">
                <div class="container mx-auto grid grid-cols-2 gap-8 md:grid-cols-4 py-8 text-center">
                    <div>
                        <h5 class="text-5xl font-bold text-blue">
                            <span class="inline text-black">
                                2179
                            </span>
                            <span class="text-black">
                                +
                            </span>
                        </h5>
                        <p class="text-black tracking-wide text-xs font-medium uppercase">
                            Cups of coffee
                        </p>
                    </div>
                    <div>
                        <h5 class="text-5xl font-bold text-blue">
                            <span class="inline text-black">
                                13
                            </span>
                            <span class="text-black">
                                +
                            </span>
                        </h5>
                        <p class="text-black tracking-wide text-xs font-medium uppercase">
                            Ongoing contracts
                        </p>
                    </div>
                    <div>
                        <h5 class="text-5xl font-bold text-blue">
                            <span class="inline text-black">
                                31
                            </span>
                            <span class="text-black">
                                +
                            </span>
                        </h5>
                        <p class="text-black tracking-wide text-xs font-medium uppercase">
                            Finished projects
                        </p>
                    </div>
                    <div>
                        <h5 class="text-5xl font-bold text-blue">
                            <span class="inline text-black">
                                3
                            </span>
                            <span class="text-black">
                                +
                            </span>
                        </h5>
                        <p class="text-black tracking-wide text-xs font-medium uppercase">
                            Years in business
                        </p>
                    </div>
                </div>
            </section> */}
            <div class="bg-white dark:bg-gray-800 overflow-hidden relative">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Opensource.svg/1200px-Opensource.svg.png" class="absolute h-full max-w-1/2 hidden lg:block right-0 top-0" />
                <div class="text-start w-1/2 py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                    <h2 class="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                        <span class="block">
                        LiveMD is an
                        </span>
                        <span class="block text-blue-600">
                        Open Soruce Project
                        </span>
                    </h2>
                    <div class="lg:mt-0 lg:flex-shrink-0">
                        <div class="mt-12 inline-flex rounded-md shadow">
                            <button type="button" class="py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2" viewBox="0 0 1792 1792">
                                    <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z">
                                    </path>
                                </svg>
                                View Project
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NonLoginPage;