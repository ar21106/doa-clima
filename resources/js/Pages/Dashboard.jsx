import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { ImageOverlay, Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapSearchOutline, mdiOpenInNew } from '@mdi/js';
import Plot from 'react-plotly.js';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Dashboard({ auth, estacionesMap, estacion, data }) {

    //poniendo los pines en el mapa para las estaciones
    let estacionesMarker = estacionesMap.map(function (estacion) {
        return (
            <Marker
                position={[estacion.latitud, estacion.longitud]}
                eventHandlers={{
                    click: (e) => {
                        console.log('estacion ' + estacion.indice + ' clickeada')
                        //TODO (Cargar pagina con /{indice} de la estacion clickeada)
                    }
                }}
            >
                <Popup>
                    {estacion.nombre}
                </Popup>
            </Marker>
        );
    });

    //mostrando los datos generales de la estacion elegida
    function estacionDatosGenerales(estacion) {
        if (estacion !== null) {
            var wazeLink = "https://www.waze.com/en/live-map/directions?latlng=" + estacion.latitud + "%2C" + estacion.longitud;
            return (
                <div className='p-4 grid grid-cols-1 gap-4'>
                    <div className='text-xl font-semibold border-b-2'>
                        Estación {estacion.indice}: {estacion.nombre}
                    </div>
                    <div>
                        {estacion.descripcion}
                    </div>

                    <div className='font-semibold border-b-2'>Datos generales:</div>
                    <div className='p-2 bg-gray-100 rounded-lg'>
                        <table className='table-auto'>
                            <tbody>
                                <tr className='border-b-2'>
                                    <td>Dirección</td>
                                    <td>{estacion.direccion}</td>
                                </tr>
                                <tr>
                                    <td>Coordenadas &#40;latitud, longitud&#41;</td>
                                    <td>
                                        {estacion.latitud}&#44; {estacion.longitud}
                                        <br></br>
                                        <a className='text-blue-600 flex flex-row' href={wazeLink} target='_blank'>
                                            Cómo llegar &#40;Waze.com&#41;
                                            <Icon title='abrir en Waze.com' path={mdiOpenInNew} size={0.6} />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <a href='#seccionDatos' className='scroll-smooth'>
                            Ver datos de la estación
                        </a>
                    </div>
                </div>
            );
        }
        return (
            <div className='bg-gray-200 flex flex-col justify-center place-items-center h-96 hover:bg-gray-300'>
                <Icon path={mdiMapSearchOutline} size={3} />
                <div></div>
                <div className='mt-8 flex'>
                    <div className='flex-initial w-6 content-center'><Icon path={mdiInformationOutline} size={0.8} /></div>
                    <div className='flex-auto'>Haz click en las estaciones del mapa para ver su infomación</div>
                </div>
            </div>);
    }

    //TODO (Enviar MapContainer atrás, al hacer scroll pasa por encima del encabezado de la pagina)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Red de monitoreo meteorológico de El Salvador</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className='gap-0 columns-1 md:columns-2'>

                            <MapContainer center={[13.8007, -88.8052]} zoom={8} scrollWheelZoom={false} className='h-96'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {estacionesMarker}
                            </MapContainer>

                            {estacionDatosGenerales(estacion)}

                        </div>

                    </div>

                    <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className='flex snap-x'>
                            <div className='flex-initial size-full m-8 rounded-lg snap-center overflow-hidden'>
                                <img src='/photos/A-31/1.jpeg'/>
                            </div>
                            <div className='flex-initial size-full m-8 rounded-lg snap-center overflow-hidden'>
                                <img src='/photos/A-31/2.jpeg'/>
                            </div>
                            <div className='flex-initial size-full m-8 rounded-lg snap-center overflow-hidden'>
                                <img src='/photos/A-31/3.jpeg'/>
                            </div>
                            <div className='flex-initial size-full m-8 rounded-lg snap-center overflow-hidden'>
                                <img src='/photos/A-31/4.jpeg'/>
                            </div>
                            <div className='flex-initial size-full m-8 rounded-lg snap-center overflow-hidden'>
                                <img src='/photos/A-31/5.jpeg'/>
                            </div>
                        </div>
                    </div>

                    <div id='seccionDatos' className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        Datos de la estación
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
