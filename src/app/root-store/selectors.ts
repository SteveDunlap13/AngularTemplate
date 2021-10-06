
import { MemoizedSelector, createSelector } from '@ngrx/store';

import { AppStoreSelectors } from './app-store';



// export const selectAppData: MemoizedSelector<object, any, any> = createSelector(

//     AppStoreSelectors.officeLocations,
//     AppStoreSelectors.inspectionItems,

//     (officeLocations: IOfficeLocation[], inspectionItems: ISection[]) => {
//         return {
//             officeLocations,
//             inspectionItems
//         };
//     }
// );
