// /lib/index.js
import BatchNameInfo from './components/BatchNameInfo';

const install = function (Vue, opts = {}) {
    if (install.installed) return;

    Vue.component(BatchNameInfo.name, BatchNameInfo);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install;