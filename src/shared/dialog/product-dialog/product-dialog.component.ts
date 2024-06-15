import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HomeComponentService } from 'src/app/frame-layout/home/home.component.service';
import { Product } from 'src/shared/model/product.model';
import { ComponentCode, UtilitiesService } from 'src/shared/utlities/utilities.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  private homeComponentService = inject(HomeComponentService);
  private dialogConfig = inject(DynamicDialogConfig);
  private messageService = inject(MessageService);
  private dialogRef = inject(DynamicDialogRef);
  private utilitiesService = inject(UtilitiesService);
  protected enum = ComponentCode;
  productFormGroup: FormGroup = new FormGroup({});
  product!: Product;
  isLoading: boolean = false;
  ngOnInit(): void {
    this.product = this.dialogConfig?.data ? this.dialogConfig.data : null;
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.productFormGroup.addControl('productName', new FormControl(this.product.title, [Validators.required]));
    this.productFormGroup.addControl('productPrice', new FormControl(this.product.price, [Validators.required]));
  }

  submitForm() {
    const updatedValue = {
      productName: this.productFormGroup.get('productName')?.value?.trim(),
      productPrice: this.productFormGroup.get('productPrice')?.value?.trim(),
    }
    this.isLoading = true;
    this.homeComponentService.updateProduct(this.product.id).subscribe({
      next: (res) => {
      }, error: (e) => {
        this.isLoading = false;
        this.messageService.clear();
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Problem in updating products.', life: 3000 })
      }, complete: () => {
        this.isLoading = false;
        this.dialogRef.close();
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully.', life: 3000 })
        this.homeComponentService.updateProductStream.next({ ...this.product, ...updatedValue });
      }
    })
  }


  getLoadingBtnStyle(componentCode$: ComponentCode) {
    return this.utilitiesService.fetchAppropriateStyles(componentCode$);
  }
}
