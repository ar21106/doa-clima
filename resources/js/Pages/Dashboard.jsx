import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Icon from '@mdi/react';
import { mdiCamera, mdiChartBar, mdiChevronLeft, mdiInformationOutline, mdiMapSearchOutline, mdiOpenInNew, mdiThermometer } from '@mdi/js';
import Plot from 'react-plotly.js';
import ImageSlider from '@/Components/ImageSlider';

export default function Dashboard({ auth, estacionesMap, estacion, data, fotos }) {

    function mostrarDivTrigger(id) {
        var div = document.getElementById(id);
        div.style.display = div.style.display == 'block' ? 'none' : 'block';
    }

    function mostrarDiv(id) { document.getElementById(id).style.display = 'block'; }

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
            var ultimaFecha = data[0].fecha;
            var ultimoTmax = data[0].tmax;
            var ultimoTmin = data[0].tmin;
            var ultimoTs = data[0].ts;
            var ultimoHr = data[0].hr;

            //indice de calor
            function heatIndex(T, R) {
                const c1 = -42.379;
                const c2 = 2.04901523;
                const c3 = 10.14333127;
                const c4 = -0.22475541;
                const c5 = -0.00683783;
                const c6 = -0.05481717;
                const c7 = 0.00122874;
                const c8 = 0.00085282;
                const c9 = -0.00000199;

                T = (T * (9 / 5)) + 32;
                var index = c1 + (c2 * T) + (c3 * R) + (c4 * T * R) + (c5 * (T*T)) + (c6 * (R*R)) + (c7 * (T*T) * R) + (c8 * T * (R*R)) + (c9 * (T*T) * (R*R));
                return index;
            }

            function heatIcon(ts, hr) {
                //TODO add icons with color acording to heat index
                var hi = heatIndex(ts, hr);
                if (hi >= 80 && hi <= 90) {
                    //caution yellow
                    return <Icon path={mdiThermometer} size={1} color='yellow' />;
                } else if (hi <= 103) {
                    //extreme caution orange
                } else if (hi <= 124) {
                    //danger redish orange
                } else {
                    //extreme danger red
                }
                //normal green
            }

            return (
                <div className='p-4 grid grid-cols-1 gap-4'>
                    <div className='text-xl font-semibold border-b-2'>
                        Estación {estacion.indice}: {estacion.nombre}
                    </div>
                    <div>
                        {estacion.descripcion}
                    </div>

                    <div className='font-semibold border-b-2'>Datos generales:</div>
                    <div className='p-2 bg-gray-100 rounded-lg text-sm'>
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

                    <div className='p-2 bg-gray-100 rounded-lg text-sm'>
                        {heatIcon(ultimoTs, ultimoHr)}
                        tmax: {ultimoTmax + ' C°'}
                    </div>

                    <div className='flex flex-row justify-end gap-4'>
                        <button
                            className='p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg flex flex-row'
                            onClick={() => {
                                mostrarDiv('temperatura');
                                document.getElementById("seccionDatos").scrollIntoView({ behavior: "smooth" })
                            }}
                        >
                            <Icon className='mr-2 place-self-center' path={mdiChartBar} size={0.8} />
                            Ver Datos
                        </button>
                        <button
                            className='p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg flex flex-row'
                            onClick={() => {
                                mostrarDiv('fotos');
                                document.getElementById("seccionFotos").scrollIntoView({ behavior: "smooth" })
                            }}
                        >
                            <Icon className='mr-2 place-self-center' path={mdiCamera} size={0.8} />
                            Ver Fotos
                        </button>
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
                <div className='mx-auto mt-4'>
                    <div className='p-2 m-4 flex flex-row rounded-lg max-w-max bg-green-100'>
                        <Icon className='mr-2 place-self-center' path={mdiInformationOutline} size={0.7} />
                        Haz clic en las fotos para verlas en tamaño completo
                    </div>
                    <ImageSlider
                        images={fotos}
                    />
                </div>
            );
        }
        //TODO mostrar algo cuando no haya estación seleccionada
    }

    // *** DATOS GENERALES PARA LOS GRÁFICOS ***
    const removeButtons = ['lasso2d', 'select2d', 'resetScale2d'];
    const config = {
        displaylogo: false,
        modeBarButtonsToRemove: removeButtons,
    }

    const colorHigh = 'red';
    const colorMed = 'LimeGreen';
    const colorLow = 'Aquamarine';
    // *** DATOS GENERALES PARA LOS GRÁFICOS ***

    //graficos de medicion de la temperatura en la estacion seleccionada
    function estacionTemperaturas(estacion) {
        if (estacion !== null) {

            //temperaturas
            var fechas = [];
            var tmax = [];
            var tmin = [];
            var ts = [];
            Object.keys(data).forEach(key => {
                fechas.push(data[key].fecha);
                tmax.push(data[key].tmax);
                tmin.push(data[key].tmin);
                ts.push(data[key].ts);
            });

            return (
                <div className='flex flex-col md:flex-row'>
                    <Plot
                        className='m-2 overflow-hidden rounded-lg w-1/2 content-center'
                        data={[
                            {
                                x: fechas,
                                y: tmax,
                                name: 'máxima',
                                type: 'bar',
                                marker: { color: colorHigh },
                            },
                            {
                                x: fechas,
                                y: ts,
                                name: 'media',
                                type: 'bar',
                                marker: { color: colorMed },
                            },
                            {
                                x: fechas,
                                y: tmin,
                                name: 'mínima',
                                type: 'bar',
                                marker: { color: colorLow },
                            },
                        ]}
                        layout={{
                            title: 'Temperatura °C',
                            barmode: 'group',
                            autosize: true,
                            xaxis: { title: 'fecha' },
                            yaxis: { title: 'Temperatura °C' },
                        }}
                        config={config}
                    />
                </div>
            );
        }
        //TODO mostrar algo cuando no haya estación seleccionada
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

                    <div id='seccionFotos' className='relative -top-16' />
                    <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <button onClick={(e) => { mostrarDivTrigger('fotos') }}>
                            <div className='m-2 flex flex-row'>
                                Fotografías de esta estación
                                <Icon path={mdiChevronLeft} rotate={90} vertical size={1} />
                            </div>
                        </button>
                        <div className='border-t-2 border-dashed' id='fotos' style={{ display: 'none' }}>
                            {estacionFotos(estacion)}
                        </div>
                    </div>

                    <div id='seccionDatos' className='relative -top-16' />
                    <div className='mt-4 text-center font-semibold'>
                        --- DATOS RECOLECTADOS POR LA ESTACIÓN ---
                    </div>
                    <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <button onClick={(e) => { mostrarDivTrigger('temperatura') }}>
                            <div className='m-2 flex flex-row'>
                                Temperatura
                                <Icon path={mdiChevronLeft} rotate={90} vertical size={1} />
                            </div>
                        </button>
                        <div className='border-t-2 border-dashed' id='temperatura' style={{ display: 'block' }}>
                            {estacionTemperaturas(estacion)}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
