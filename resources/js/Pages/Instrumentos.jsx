import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { mdiCubeOutline } from '@mdi/js';
import Icon from '@mdi/react';

export default function Datos({ auth, estacion, instrumento, instrumentos }) {
    if (estacion == null) {
        window.open('/instrumentos', '_self');
    }

    let opciones = instrumentos.map(function (item) {
        var link = '/instrumentos/' + estacion.indice + '/' + item;
        var estilo = 'm-2 p-2 bg-white border-2 border-white hover:border-gray-500 rounded-lg flex flex-row';

        if (item == instrumento) {
            estilo = 'm-2 p-2 bg-gray-200 border-2 border-gray-500 hover:border-gray-500 rounded-lg flex flex-row';
        }

        return (
            <a href={link}>
                <div id={item} key={item} className={estilo}>
                    <Icon className='mr-2' path={mdiCubeOutline} size={1} />
                    {item}
                </div>
            </a>
        );
    })

    function imagen3d() {
        if (instrumento == "") {
            return (
                <div className='h-full place-content-center'>
                    <Icon className='mx-auto' path={mdiCubeOutline} size={3} color='white' />
                    <div className='text-white text-center'>
                        Eliga un instrumento de la lista para ver el modelo 3D
                    </div>
                </div>
            );
        }

        var img = '/3d/' + instrumento + '.jpeg'
        return (
            <img className='h-96 mx-auto' src={img}></img>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Modelos 3D - instrumentos</h2>}
        >
            <Head title="Modelos 3D" />

            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='font-bold m-2 border-b-2 border-dashed'>
                            {'Estación ' + estacion.indice + ': ' + estacion.nombre}
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/5 h-96 rounded-lg m-2 bg-gray-100 overflow-y-scroll'>
                                {opciones}
                            </div>
                            <div className='w-4/5 h-96 m-2 overflow-hidden rounded-lg bg-black'>
                                {imagen3d()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}