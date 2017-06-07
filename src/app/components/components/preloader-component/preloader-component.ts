import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'preloader-component',
    templateUrl: 'preloader-component.html'
})

export class PreloaderComponent{
    @Input()
    captionText: String;
}