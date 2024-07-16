import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InfoIcon from '@/Components/InfoIcon';
import MapSearch from '@/Components/MapSearch';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Dashboard({ auth, estacionesMap, estacion, data }) {

    //poniendo los pines en el mapa para las estaciones
    let estacionesMarker = estacionesMap.map(function (estacion) {
        return (
            <Marker position={[estacion.latitud, estacion.longitud]}>
                <Popup>
                    {estacion.nombre}
                </Popup>
            </Marker>
        );
    });

    //mostrando los datos generales de la estacion elegida
    function estacionDatosGenerales(estacion) {
        if (estacion !== null) {
            return (<>
                <div className='text-xl font-semibold border-b-2'>
                    Estación {estacion.indice} - {estacion.nombre}
                </div>
                <div>
                    {estacion.descripcion}
                </div>

                <div className='font-semibold border-b-2'>Datos generales:</div>
                <table className='table-auto'>
                    <tbody>
                        <tr>
                            <td>Dirección</td>
                            <td>{estacion.direccion}</td>
                        </tr>
                        <tr>
                            <td>Coordenadas &#40;latitud, longitud&#41;</td>
                            <td>
                                &#40;{estacion.latitud}&#44; {estacion.longitud}&#41;
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>);
        }
        return (<>
            <MapSearch></MapSearch>
            <div>Haz click en las estaciones del mapa para ver su infomación</div>
        </>);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Red de monitoreo meteorológico de El Salvador</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className='m-4'>
                            <div className='p-2 bg-green-100 rounded-2xl text-green-900 flex'>
                                <div className='flex-initial w-8 content-center'><InfoIcon></InfoIcon></div>
                                <div className='flex-auto'>Haz click en las estaciones del mapa para ver su infomación</div>
                            </div>
                        </div>

                        <div className='gap-0 columns-1 md:columns-2'>

                            <MapContainer center={[13.8007, -88.8052]} zoom={8} scrollWheelZoom={true} className='h-96'>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {estacionesMarker}
                            </MapContainer>

                            <div className='m-8 grid grid-cols-1 gap-4'>
                                {estacionDatosGenerales(estacion)}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
