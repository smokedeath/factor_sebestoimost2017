import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'pass-ref-dialog',
    templateUrl: 'pass-ref-dialog.html',
    styleUrls: ['pass-ref-dialog.css']
})

export class PassRefDialogComponent{
    @Input()
    StatusDialog: boolean = false;

    email: String = '';
}