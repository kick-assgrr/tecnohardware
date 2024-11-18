import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { productosmodel } from 'src/app/models/productos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  productos: productosmodel[] = [];
  newProductos: any = {};
  cargando: boolean = false;
  categoriaSeleccionada: string = 'TarjetasVideo';

  constructor(private firestoreService: FirestoreService, private helper: HelperService ) { }

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.cargando = true;
    this.firestoreService.getcollectionChanges<productosmodel>(this.categoriaSeleccionada).subscribe(data => {
      if (data) {
        this.productos = data;
      }
      this.cargando = false;
    });
  }

  save() {
    this.cargando = true;
    if (this.newProductos.id) {
      this.firestoreService.updateProductoID(this.newProductos, this.categoriaSeleccionada, this.newProductos.id)
        .then(() => {
          this.newProductos = {}; 
          this.loadProductos();
        })
        .catch(error => {
          console.error('Error al actualizar producto:', error);
        })
        .finally(() => {
          this.cargando = false;
          setTimeout(() => {
            location.reload();
          },0);

        });

        
        
    } else {
      this.newProductos.id = this.firestoreService.createIdDoc();
      this.firestoreService.createProductoID(this.newProductos, this.categoriaSeleccionada, this.newProductos.id)
        .then(() => {
          this.newProductos = {};
          this.loadProductos(); // Recarga la lista de productos después de guardar
        })
        .catch(error => {
          console.error('Error al guardar producto:', error);
        })
        .finally(() => {
          this.cargando = false;
        });
    }
  }

  edit(producto: productosmodel) {
    this.newProductos = { ...producto };
    this.scrollToTop();
  }

  async delete(producto: productosmodel) {
    this.cargando = true;
    try {
      await this.firestoreService.deleteProductoID(this.categoriaSeleccionada, producto.id);
      this.loadProductos(); // Recarga la lista de productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    } finally {
      this.cargando = false;
    }
  }

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(400);
    }
  }
  
}