import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { DialogHelperService } from '../services/dialog-helper.service';
import { IDirtyComponent } from '../models/i-dirty-component';
import { environment } from 'src/environments/environment';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DirtyComponentGuard implements CanDeactivate<IDirtyComponent> {


    private lastDirtyUrl: string;

    constructor(
        private readonly dialogHelperService: DialogHelperService,
        private locationStrategy: LocationStrategy
    ) {

    }

    async canDeactivate(
        component: IDirtyComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Promise<boolean> {


        const isDirty = component.checkIfDirty !== undefined && component.checkIfDirty();

        if (isDirty === true) {
            let componentIsDirtyMsg = component.prepareMessageWhenDirty();

            if (componentIsDirtyMsg == null) {
                componentIsDirtyMsg = environment.defaultWhenDeactivateDirtyCmpMsg;
            }


            if (this.lastDirtyUrl != null) {
                return false;
            }

            this.lastDirtyUrl = currentState.url;

            history.pushState(null, null, location.href);
            this.locationStrategy.onPopState(() => {
                history.pushState(null, null, location.href);
            });

            const result = await this.dialogHelperService.openDialogYesNo('Waarning', componentIsDirtyMsg).toPromise();

            this.lastDirtyUrl = null;
            const isClose = result;
            return isClose;
        }

        return true;
    }


}
