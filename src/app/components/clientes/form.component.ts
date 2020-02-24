import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Crear Cliente';

  private errors: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente );
      }
    });
  }

  // creado de la forma de pasar el objeto cliente
  public create(): void {
   // console.log('Clicked!');
   // console.log(this.cliente);
    this.clienteService.create(this.cliente)
      .subscribe( cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success');
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Codigo del error desde el backen: ' + err.status );
          console.error(err.error.errors);
        }
    );
  }

  // update creado de la forma de pasar un response
  update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente)
      .subscribe( response => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `Cliente ${response.cliente.nombre} actualizado con exito!`, 'success');
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Codigo del error desde el backen: ' + err.status );
          console.error(err.error.errors);
        });
  }

}
