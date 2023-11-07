import Vue from 'vue';

import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
// uncomment to enable <vuetable-pagination-dropdown> component
// import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';

import VuetableSearchBar from './VuetableSearchBar';
import VuetableDefaultPagination from './VuetableDefaultPagination';
import VuetableDefaultPageLength from './VuetableDefaultPageLength';


/**
 * Vuetable plugin
 *
 * @see https://github.com/ratiw/vuetable-2
 */
Vue.component('vuetable', Vuetable);
Vue.component('vuetable-pagination', VuetablePagination);
// uncomment to enable <vuetable-pagination-dropdown> component
// Vue.component('vuetable-pagination-dropdown', VuetablePaginationDropdown);
Vue.component('vuetable-pagination-info', VuetablePaginationInfo);

/**
 * Default vuetable setup.
 */
Vue.component(VuetableSearchBar.name, VuetableSearchBar);
Vue.component('vuetable-default-pagination', VuetableDefaultPagination);
Vue.component('vuetable-default-page-length', VuetableDefaultPageLength);
