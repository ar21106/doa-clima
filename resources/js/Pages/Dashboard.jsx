import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InfoIcon from '@/Components/InfoIcon';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Dashboard({ auth, estaciones }) {

    let estacionesMarker = estaciones.map(function(estacion) {
        return (
            <Marker position={[estacion.latitud, estacion.longitud]}>
                <Popup>
                    {estacion.nombre}
                </Popup>
            </Marker>
        );
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Red de monitoreo meteorológico El Salvador</h2>}
        >
            <Head title="Inicio"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg columns-2">

                        <div className='m-2'>
                            <div className='p-2 bg-green-100 rounded-2xl text-green-900 flex'>
                                <div className='flex-initial w-8 content-center'><InfoIcon></InfoIcon></div>
                                <div className='flex-auto'>Haz click en las estaciones del mapa para ver su infomación</div>
                            </div>

                            <div className='mt-4 overflow-hidden rounded-2xl border-8 border-double'>
                                <div className='columns-2'>
                                    <div className='p-2 font-bold bg-gray-100'>Nombre de la estacion:</div>
                                    <div className='p-2'>Aquí irá el nombre</div>
                                </div>

                                <div className='columns-2'>
                                    <div className='p-2 font-bold bg-gray-200'>Descripción:</div>
                                    <div className='p-2'>Aquí irá la descripción</div>
                                </div>
                            </div>
                        </div>

                        <MapContainer center={[13.8007, -88.8052]} zoom={8} scrollWheelZoom={true} className='h-96'>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {estacionesMarker}
                        </MapContainer>

                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
