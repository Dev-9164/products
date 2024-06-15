import { NgModule } from "@angular/core";
import { ProductDialogComponent } from "./product-dialog/product-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { NgIf } from "@angular/common";

@NgModule({
    declarations: [ProductDialogComponent],
    imports: [ReactiveFormsModule, FormsModule, ButtonModule, InputTextModule, NgIf],
    exports: [ProductDialogComponent]
})

export class ProductDialogModule { }