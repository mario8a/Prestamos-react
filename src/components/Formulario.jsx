import React, {useState, Fragment} from 'react';
import {calcularTotal} from '../helpers';
const Formulario = (props) => {
    const {cantidad, guardarCantidad, plazo, guardarPlazo, guardarTotal, guardarCargando} = props;
    
    //Uso del state
    //[Variable que va tener el state, funcion para modificar el state]
    //La infor fliye de componentes padre a hijos, no de l hijo al padre
    // por lo que esta de abajo se ira al padre
    // const [cantidad, guardarCantidad] = useState(0);

    // const leerCantidad = (e) => {
    //     guardarCantidad(parseInt(e.target.value));
    // }

    //Definiendo state
    //Este state es local ya que no estara pasando informacion a otros componentes

    const [error, guardarError] = useState(false);


    //Cuando el usuario hace submit
    const calcularPrestamo = e => {
        e.preventDefault();
        //validar
        if(cantidad === 0 || plazo === '') {
            guardarError(true);
            return;
        }

        //eliminar el error previo
        guardarError(false);

        //Habilitar el spinner
        guardarCargando(true);

        setTimeout(() => {
            //enviar cotizacion
            const total = calcularTotal(cantidad, plazo);
            // console.log(total);

            //Una vez calculado, guardartotal
            guardarTotal(total);
            //Desabilitar el spinner
            guardarCargando(false);
        }, 3000);

        
    }

    return (
    <Fragment>
        <form onSubmit={calcularPrestamo}>
            {cantidad}
            {plazo}
          <div className="row">
              <div>
                  <label>Cantidad Prestamo</label>
                  <input 
                      className="u-full-width" 
                      type="number" 
                      placeholder="Ejemplo: 3000" 
                      onChange={e => guardarCantidad(parseInt(e.target.value))}
                  />
              </div>
              <div>
                  <label>Plazo para Pagar</label>
                  <select 
                      className="u-full-width"
                      onChange={e => guardarPlazo(parseInt(e.target.value))}
                  >
                      <option value="">Seleccionar</option>
                      <option value="3">3 meses</option>
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                  </select>
              </div>
              <div>
                  <input 
                      type="submit" 
                      value="Calcular" 
                      className="button-primary u-full-width" 
                  />
              </div>
          </div>
        </form>

        {(error)  ?   <p className="error">Todos los campos son obligatorios</p>: null}
       
    </Fragment>
    );
}
 
export default Formulario;