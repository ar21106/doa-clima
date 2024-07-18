import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapSearchOutline, mdiOpenInNew } from '@mdi/js';
import Plot from 'react-plotly.js';
import ImageSlider from '@/Components/ImageSlider';

export default function Dashboard({ auth, estacionesMap, estacion, data, fotos }) {

    //poniendo los pines en el mapa para las estaciones
    let estacionesMarker = estacionesMap.map(function (estacion) {
        return (
            <Marker
                key={estacion.nombre}
                position={[estacion.latitud, estacion.longitud]}
                eventHandlers={{
                    click: (e) => {
                        window.open("/mapa/" + estacion.indice, "_self");
                    }
                }}
            />
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
                        <a href='#seccionDatos'>
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

    //mostrando las fotos de la estacion
    function estacionFotos(estacion) {
        if (estacion !== null) {
            return (
                <div className="mt-4 bg-white shadow-sm sm:rounded-lg">
                    <div className='mx-auto'>
                        <ImageSlider
                            images={fotos}
                        />
                    </div>
                </div>
            );
        }
    }

    //mostrando los datos completos de la estacion
    function estacionDatos(estacion) {
        if (estacion !== null) {
            return (
                <div id='seccionDatos' className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    Datos de la estación
                </div>
            );
        }
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

                    {estacionFotos(estacion)}

                    {estacionDatos(estacion)}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
