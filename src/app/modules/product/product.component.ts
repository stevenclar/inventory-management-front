import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/core/services/product/product.service';
import Product from 'src/app/core/interfaces/product';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const LIMIT = 5;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  faEdit = faEdit;
  faRemove = faTrash;

  products: Product[] = [];

  currentPage: number = 1;
  hasNextPage: boolean = false;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly productService: ProductService,
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  get disablePreviousPage() {
    return this.currentPage <= 1;
  }

  nextPage() {
    this.currentPage++;
    this.getProducts();
  }

  previousPage() {
    this.currentPage--;
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getMyProducts({ limit: LIMIT, page: this.currentPage })
      .subscribe((response: any) => {
        this.products = response.data;
        this.hasNextPage = response.hasNextPage;
        console.log('hasNextPage', this.hasNextPage);
        console.log('disablePreviousPage', this.disablePreviousPage);
      });
  }

  openCreateProductDialog() {
    const dialog = this.matDialog.open(CreateProductComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getProducts();
      }
    });
  }

  openEditProductDialog(product: Product) {
    const dialog = this.matDialog.open(EditProductComponent, {
      data: product,
    });
    dialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getProducts();
      }
    });
  }

  deleteProduct(productId: number) {
    this.alertService
      .showConfirmation(
        this.translateService.instant('product.delete.title'),
        this.translateService.instant('product.delete.message')
      )
      .then((response) => {
        if (response) {
          this.productService.deleteProduct(productId).subscribe(() => {
            this.alertService.showToast('Compañía eliminada correctamente');
            this.getProducts();
          });
        }
      });
  }
}
