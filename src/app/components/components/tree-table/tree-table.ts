import { Component, Input, OnChanges } from '@angular/core';
import { Dictionary } from './../../../../assets/dictionary';
import { TreeNode } from 'primeng/primeng';
import { TreeTabelDate } from './../../../share/treeTabelDate.service';
import { OverlayPanel } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'tree-table',
    templateUrl: 'tree-table.html',
    styleUrls: ['tree-table.css']
})

export class TreeTableComponent {       
    constructor(private dictionary : Dictionary){}              
    selectedField: any;   

    @Input()
    tableDate = [];  

    @Input()
    tableDateColumns = [];

    @Input()
    langId: any = 0;

    diction: any;

    FilterTableDate = [];
    filterColumnIdStatValue : TreeNode[];
    selectefilterColumnIdStatValue: TreeNode[];
    filterColumnNameStatValue : TreeNode[];
    selectefilterColumnNameStatValue: TreeNode[];

    ngOnChanges(){
        this.filterColumnIdStatValue = [];
        this.FilterTableDate = [];
        this.filterColumnIdStatValue = this.getChildDate(this.tableDate, 0);
        this.filterColumnNameStatValue = this.getChildDate(this.tableDate, 1);
        for (let i=0; i<this.tableDate.length; i++) this.FilterTableDate.push(this.tableDate[i]);
    }

    selectFilter(overlaypanel: OverlayPanel){
        overlaypanel.toggle(event);
    } 

    searchFilter(id: Number): Boolean{
        let res: Boolean = false;
        for (let i=0; i< this.selectefilterColumnIdStatValue.length; i++){
            if (this.selectefilterColumnIdStatValue[i].label == id.toString()){
                res = true;
                break; 
            }
        }
        return res;
    }   

    filterTreeId(e){
        this.FilterTableDate = [];
        for(let i=0; i<this.tableDate.length; i++){
            if(this.searchFilter(this.tableDate[i].data.id)){
                this.FilterTableDate.push(this.tableDate[i]); 
            }else{
                if (this.tableDate[i].children != null && this.tableDate[i].children.length>0){                   
                    let children = [];
                    children = this.addChildDate(this.tableDate[i].children);    
                    if (children.length>0) this.FilterTableDate.push({data: this.tableDate[i].data, children: children});     
                }
            }
        }
    }

    addChildDate(inDate: TreeTabelDate[]): TreeTabelDate[]{
        let outDate = [];
        for (let i=0; i<inDate.length; i++){
            if(this.searchFilter(inDate[i].data.id)){
                outDate.push(inDate[i])
            }else{
                if (inDate[i].children != null && inDate[i].children.length>0){                   
                    let children = [];
                    children = this.addChildDate(inDate[i].children);    
                    if (children.length>0) this.FilterTableDate.push({data: inDate[i].data, children: children});     
                }
            }           
        }
        return outDate;
    }

    getChildDate(inDate: TreeNode[], typeColumn: Number): TreeNode[]{
        let outDate: TreeNode[];
        let children: TreeNode[];

        outDate = [];
        for (let i=0; i<inDate.length; i++){
            let ch = 0;          
            if (inDate[i].children != null && inDate[i].children.length>0){
                children = this.getChildDate(inDate[i].children, typeColumn);
                ch = 1;
            }             
            if (typeColumn==0){
                if (ch==0)outDate.push({  label: inDate[i].data.id });
                else outDate.push({label: inDate[i].data.id, children: children});
            }else{
                if (ch==0)outDate.push({  label: inDate[i].data.name });
                else outDate.push({label: inDate[i].data.name, children: children});
            }
        }
        return outDate;
    }

    ngOnInit(){
        this.diction = this.dictionary.dictionary;
    }
    
}