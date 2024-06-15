import { Component, OnDestroy, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { HomeComponentService, Loaders, PaginatorCofiguration } from './home.component.service';
import { Product } from '../.././../shared/model/product.model';
import { MessageService } from 'primeng/api';
import { ComponentCode, UtilitiesService } from 'src/shared/utlities/utilities.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from 'src/shared/dialog/product-dialog/product-dialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tableHeadings: string[] = ['id', 'name', 'category', 'price', ''];
  tableData: Product[] = [];
  tempTableData: WritableSignal<Product[]> = signal([]);
  isChartViewActive: WritableSignal<boolean> = signal(false);
  deletedProductList: Product[] = [];
  loaders: Loaders = {
    isFetchingProducts: false,
    isPageRefreshing: false,
    isProductDeletionInProgress: false,
  }

  selectedProductId: number | null = null

  paginationConfig: PaginatorCofiguration = {
    first: 0,
    row: 10,
    page: 0,
  }

  private homeComponentService = inject(HomeComponentService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);
  private utilitiesService = inject(UtilitiesService);
  protected enum = ComponentCode;
  private subsciption: Subscription[] = [];
  chartData: { name: string, value: number }[] = [];
  multi: any[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', 'yellow', 'voilet', 'blue']
  };
  view: [number, number] = [1400, 650];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Product Names';
  showYAxisLabel = true;
  yAxisLabel = 'Price';

  constructor() {
    Object.assign(this, this.chartData);
  }



  ngOnInit() {
    this.fetchProductDetails();
    const updateSub = this.homeComponentService.updateProductObservable$.subscribe({
      next: (res: any) => {
        if (res.id) {
          const idx = this.tableData.findIndex((product) => product.id === res.id);
          if (idx >= 0) {
            this.tableData[idx].title = res?.productName;
            this.tableData[idx].price = res?.productPrice;
            this.chartData = [];
            Object.assign(this, this.chartData);
            this.tableData.forEach((product) => {
              this.chartData.push({ name: product.title, value: product.price });
            })
          }
        }
      }
    });

    this.subsciption.push(updateSub);
  }

  fetchProductDetails(isRefresh: boolean = false) {
    this.loaders.isFetchingProducts = true;
    this.chartData = [];
    this.homeComponentService.getProductDetails().subscribe({
      next: (products: Product[]) => {
        this.tableData = products;
        this.tempTableData.update(() => this.tableData.slice(this.paginationConfig.first, (this.paginationConfig.row)));
      }, error: () => {
        this.loaders.isFetchingProducts = false;
        this.loaders.isPageRefreshing = false;
        this.messageService.clear();
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Problem in fetching products.', life: 3000 });
      }
      , complete: () => {
        if (isRefresh) {
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Refresh succesfull.', life: 3000 });
          this.loaders.isPageRefreshing = false;
        }
        this.loaders.isFetchingProducts = false;
        this.tableData.forEach((product) => {
          this.chartData.push({ name: product.title, value: product.price });
        })
      }
    });
  }

  refreshProducts(isRefresh: boolean) {
    this.loaders.isPageRefreshing = true;
    this.resetAll();
    this.fetchProductDetails(isRefresh);
  }


  private resetAll() {
    this.paginationConfig.first = 0;
    this.paginationConfig.page = 0;
    this.paginationConfig.row = 10;
    this.deletedProductList = [];
  }



  edit(product: Product) {
    const ref = this.dialogService.open(ProductDialogComponent, {
      data: product,
      width: '35%',
      height: '60%',
      closable: true,
      closeOnEscape: true,
      position: 'center',
      style: {
        'padding': '2rem',
        'background-color': '#1e1e1e'
      }
    });
  }

  remove(product: Product) {
    this.selectedProductId = product.id;
    this.loaders.isProductDeletionInProgress = true
    const productId = this.selectedProductId;
    !this.verifyProductIfDeleted(productId) ? (this.deletedProductList.push(product), this.removeSelectedProductFromList(productId)) : null;
  }

  removeSelectedProductFromList(productId: number) {
    const idx = this.tableData.findIndex((product) => product.id === productId);
    if (idx >= 0) this.chartData.splice(idx, 1);
    this.tempTableData().forEach((product: Product, index: number) => {
      if (product.id === productId) {
        this.tempTableData().splice(index, 1);
      }
      this.loaders.isProductDeletionInProgress = false;
    });
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully.', life: 3000 });
  }


  getStyles(componentCode$: ComponentCode) {
    return this.utilitiesService.fetchAppropriateStyles(componentCode$)
  }

  verifyProductIfDeleted(productId: number) {
    return this.deletedProductList.find((product: Product) => product.id === productId);
  }

  onPageChange(event: any) {
    this.paginationConfig.page = event?.page;
    this.paginationConfig.first = event?.first;
    this.paginationConfig.row = event?.rows;
    this.tempTableData.update(() => this.tableData.slice(this.paginationConfig.first, ((this.paginationConfig.page + 1) * this.paginationConfig.row)))
  }

  openChartView() {
    this.isChartViewActive.set(true);
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.subsciption.forEach(sub => sub.unsubscribe());
  }
}
