import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Icon from '@mdi/react';
import { mdiCamera, mdiChartBar, mdiChevronLeft, mdiInformationOutline, mdiMapSearchOutline, mdiOpenInNew, mdiWaterPercent } from '@mdi/js';
import { mdiThermometer, mdiThermometerAlert, mdiThermometerCheck } from '@mdi/js';
import Plot from 'react-plotly.js';
import ImageSlider from '@/Components/ImageSlider';

export default function Dashboard({ auth, estacionesMap, estacion, data, fotos }) {

    //sacando los datos como arrays para los gráficos
    if (estacion !== null) {
        //arrays
        var fechas = [];
        var ts07 = [], ts14 = [], ts21 = [], ts = [];
        var th07 = [], th14 = [], th21 = [], th = [];
        var hr07 = [], hr14 = [], hr21 = [], hr = [];
        var pvp07 = [], pvp14 = [], pvp21 = [], pvp = [];
        var p07 = [], p14 = [], p21 = [], pd = [];
        var sa07 = [], sa14 = [], sa21 = [], sa = [];
        var nub07 = [], nub14 = [], nub21 = [], nub = [];
        var vis07 = [], vis14 = [], vis21 = [];

        //sacando info de los datos para agregarlos a los arrays
        Object.keys(data).forEach(key => {
            fechas.push(data[key].fecha);
            ts07.push(data[key].ts07);
            ts14.push(data[key].ts14);
            ts21.push(data[key].ts21);
            ts.push(data[key].ts);

            th07.push(data[key].th07);
            th14.push(data[key].th14);
            th21.push(data[key].th21);
            th.push(data[key].th);

            hr07.push(data[key].hr07);
            hr14.push(data[key].hr14);
            hr21.push(data[key].hr21);
            hr.push(data[key].hr);

            pvp07.push(data[key].pvp07);
            pvp14.push(data[key].pvp14);
            pvp21.push(data[key].pvp21);
            pvp.push(data[key].pvp);

            p07.push(data[key].p07);
            p14.push(data[key].p14);
            p21.push(data[key].p21);
            pd.push(data[key].pd);

            sa07.push(data[key].sa07);
            sa14.push(data[key].sa14);
            sa21.push(data[key].sa21);
            sa.push(data[key].sa);

            nub07.push(data[key].nub07);
            nub14.push(data[key].nub14);
            nub21.push(data[key].nub21);
            nub.push(data[key].nub);

            vis07.push(data[key].vis07);
            vis14.push(data[key].vis14);
            vis21.push(data[key].vis21);
        });
    }

    function mostrarDivTrigger(id) {
        var div = document.getElementById(id);
        div.style.display = div.style.display == 'block' ? 'none' : 'block';
    }

    function mostrarDivs(item) { document.getElementById(item).style.display = 'block'; }

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
            var ultimoTmax = data[0].tmax;
            var ultimoTmin = data[0].tmin;
            var ultimoTs = data[0].ts;
            var ultimoHr = data[0].hr;
            var diaTs = [data[0].ts07, data[0].ts14, data[0].ts21];
            var diaHr = [data[0].hr07, data[0].hr14, data[0].hr21];

            var ftxt = data[0].fecha.split("-");
            var f = new Date(ftxt[0], ftxt[1], ftxt[2]);
            var dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var ultimaFecha = f.toLocaleDateString("es", dateFormat);

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
                var index = c1 + (c2 * T) + (c3 * R) + (c4 * T * R) + (c5 * (T * T)) + (c6 * (R * R)) + (c7 * (T * T) * R) + (c8 * T * (R * R)) + (c9 * (T * T) * (R * R));
                return index;
            }

            //icono temperatura dinamico
            function heatIcon(ts, hr) {
                var hi = heatIndex(ts, hr);

                if (hi >= 80 && hi <= 90) {
                    //caution yellow
                    return <Icon title='Temperatura: Precaución' path={mdiThermometer} size={0.8} color='gold' />;
                } else if (hi <= 103) {
                    //extreme caution orange
                    return <Icon title='Temperatura: Alerta media' path={mdiThermometerAlert} size={0.8} color='orange' />;
                } else if (hi <= 124) {
                    //danger redish orange
                    return <Icon title='Temperatura: Peligro' path={mdiThermometerAlert} size={0.8} color='OrangeRed' />;
                } else if (hi > 124) {
                    //extreme danger red
                    return <Icon title='Temperatura: Peligro Extremo' path={mdiThermometerAlert} size={0.8} color='Red' />;
                }
                //normal green
                return <Icon title='Temperatura: Aceptable' path={mdiThermometerCheck} size={0.8} color='Lime' />;
            }

            //gráfico evolucion de temperatura media durante el dia
            function tsDia() {
                const mh = 50;
                const mv = 25;
                const removeButtonsSmall = ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d', 'toImage'];
                return (
                    <Plot
                        className='overflow-hidden sm:w-1/2 w-full content-center'
                        data={[
                            {
                                x: ['7:00 am', '2:00 pm', '9:00 pm'],
                                y: diaTs,
                                name: 'temperatura',
                                type: 'scatter',
                                line: { shape: 'spline', color: 'black' },
                                mode: 'lines+markers',
                                hoverinfo: 'y',
                            },
                        ]}
                        layout={{
                            font: { size: 10 },
                            title: 'Temperatura durante el día',
                            yaxis: { title: '°C' },
                            margin: { t: mv, r: mh, b: mv, l: mh },
                            height: 120,
                            paper_bgcolor: 'rgb(243 244 246)',
                            plot_bgcolor: 'rgb(243 244 246)',
                        }}
                        config={{ displaylogo: false, modeBarButtonsToRemove: removeButtonsSmall }}
                    />
                );
            }

            //gráfico evolucion de la humedad media durante el dia
            function hrDia() {
                const mh = 50;
                const mv = 25;
                const removeButtonsSmall = ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d', 'toImage'];
                return (
                    <Plot
                        className='overflow-hidden sm:w-1/2 w-full content-center'
                        data={[
                            {
                                x: ['7:00 am', '2:00 pm', '9:00 pm'],
                                y: diaHr,
                                name: 'Humedad media',
                                type: 'scatter',
                                line: { shape: 'spline', color: 'black' },
                                mode: 'lines+markers',
                                hoverinfo: 'y',
                            },
                        ]}
                        layout={{
                            font: { size: 10 },
                            title: 'Humedad media durante el día',
                            yaxis: { title: '%' },
                            margin: { t: mv, r: mh, b: mv, l: mh },
                            height: 120,
                            paper_bgcolor: 'rgb(243 244 246)',
                            plot_bgcolor: 'rgb(243 244 246)',
                        }}
                        config={{ displaylogo: false, modeBarButtonsToRemove: removeButtonsSmall }}
                    />
                );
            }

            return (
                //Nombre de la estación
                <div className='p-4 grid grid-cols-1 gap-3 h-[26rem]'>
                    <div className='text-xl font-semibold border-b-2'>
                        Estación {estacion.indice}: {estacion.nombre}
                    </div>

                    {
                        //Datos generales (tabla)
                    }
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

                    {
                        //Resumen de datos relevantes (temperatura, humedad, indice de calor)
                    }
                    <div className='p-2 bg-gray-100 rounded-lg text-sm flex flex-col gap-1'>
                        <div>Datos del día {ultimaFecha + ' (últimos datos encontrados)'}</div>

                        <div className='flex flex-row gap-4'>
                            <div className='flex flex-row'>
                                {heatIcon(ultimoTmax, ultimoHr)}
                                max: {Math.round(ultimoTmax * 100) / 100 + ' C°'}
                            </div>

                            <div className='flex flex-row'>
                                {heatIcon(ultimoTmin, ultimoHr)}
                                min: {Math.round(ultimoTmin * 100) / 100 + ' C°'}
                            </div>

                            <div className='flex flex-row'>
                                {heatIcon(ultimoTs, ultimoHr)}
                                media: {Math.round(ultimoTs * 100) / 100 + ' C°'}
                            </div>

                            <div className='flex flex-row'>
                                <Icon path={mdiWaterPercent} size={0.8} color='DodgerBlue' />
                                Humedad: {ultimoHr + ' %'}
                                {
                                    //TODO add context for the user about what the colors mean, about the heat index
                                }
                            </div>
                        </div>
                        <div className='pt-2 flex flex-col sm:flex-row overflow-hidden border-t-2'>
                            {tsDia()}
                            {hrDia()}
                        </div>
                    </div>

                    {
                        //Botones
                    }
                    <div className='flex flex-row justify-end gap-4'>
                        <button
                            className='p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg flex flex-row text-sm'
                            onClick={() => {
                                [
                                    "Temperatura", "Humedad Relativa", "Presion de vapor", "Precipitación", "Viento", "Nubosidad", "Visibilidad"
                                ].forEach(mostrarDivs);
                                document.getElementById("seccionDatos").scrollIntoView({ behavior: "smooth" })
                            }}
                        >
                            <Icon className='mr-2 place-self-center' path={mdiChartBar} size={0.7} />
                            Ver más Datos
                        </button>
                        <button
                            className='p-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg flex flex-row text-sm'
                            onClick={() => {
                                ['fotos'].forEach(mostrarDivs);
                                document.getElementById("seccionFotos").scrollIntoView({ behavior: "smooth" })
                            }}
                        >
                            <Icon className='mr-2 place-self-center' path={mdiCamera} size={0.7} />
                            Ver Fotos
                        </button>
                    </div>

                </div>
            );
        }

        return (
            <div className='bg-gray-200 flex flex-col justify-center place-items-center h-[26rem] hover:bg-gray-300'>
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
            return (<>
                <div id='seccionFotos' className='relative -top-16' />
                <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <button onClick={(e) => { mostrarDivTrigger('fotos') }}>
                        <div className='m-2 flex flex-row'>
                            Fotografías de esta estación
                            <Icon path={mdiChevronLeft} rotate={90} vertical size={1} />
                        </div>
                    </button>
                    <div className='border-t-2 border-dashed' id='fotos' style={{ display: 'none' }}>
                        <div className='mx-auto mt-4'>
                            <div className='p-2 m-4 flex flex-row rounded-lg max-w-max bg-green-100'>
                                <Icon className='mr-2 place-self-center' path={mdiInformationOutline} size={0.7} />
                                Haz clic en las fotos para verlas en tamaño completo
                            </div>
                            <ImageSlider
                                images={fotos}
                            />
                        </div>
                    </div>
                </div>
            </>);
        }
    }

    //datos encabezado
    function datosEncabezado(estacion) {
        if (estacion !== null) {
            return (<>
                <div id='seccionDatos' className='relative -top-16' />
                <div className='mt-4 text-center font-semibold'>
                    --- DATOS RECOLECTADOS POR LA ESTACIÓN ---
                </div>
                <div className='m-1 p-1 flex flex-row gap-2 mx-auto rounded-lg w-fit bg-yellow-100'>
                    <Icon className='place-self-center' path={mdiInformationOutline} size={0.7} />
                    Se muestran los datos de los últimos 7 días
                </div>
            </>);
        }
    }

    //seccion de datos
    function seccionDatos(estacion, titulo, medida) {
        if (estacion !== null) {
            function grafico() {
                switch (medida) {
                    case "temperatura":
                        return (
                            <div className='flex flex-col md:flex-row place-content-center'>
                                {grafico1("Temperatura °C", "°C", ts07, ts14, ts21, ts)}
                                {grafico1("Temperatura Húmeda °C", "°C", th07, th14, th21, th)}
                            </div>
                        )
                    case "humedad":
                        return grafico1("Humedad Relativa %", "%", hr07, hr14, hr21, hr);

                    case "presion de vapor":
                        return grafico1("Presión de vapor mmHg", "mmHg", pvp07, pvp14, pvp21, pvp);

                    case "precipitacion":
                        return grafico1("Precipitación mm", "mm", p07, p14, p21, pd);

                    case "viento":
                        return grafico1("Velocidad del viento (Beaufort)", "Beaufort", sa07, sa14, sa21, sa);

                    case "nubosidad":
                        return grafico1("Nubosidad", "Décimas", nub07, nub14, nub21, nub);

                    case "visivilidad":
                        return grafico1("Visibilidad", "Km", vis07, vis14, vis21, []);

                    default:
                        break;
                }
            }

            //TODO a button to access the more detailded
            return (
                <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <button onClick={(e) => { mostrarDivTrigger(titulo) }}>
                        <div className='m-2 flex flex-row'>
                            {titulo}
                            <Icon path={mdiChevronLeft} rotate={90} vertical size={1} />
                        </div>
                    </button>
                    <div className='border-t-2 border-dashed' id={titulo} style={{ display: 'block' }}>
                        {grafico()}
                    </div>
                </div>


            );
        }
    }

    //gráfico 1: 3 barras para medidas 7am, 2pm y 9pm y linea para valor medio
    function grafico1(titulo, variable, v07, v14, v21, media) {

        //configuración
        const removeButtons = ['lasso2d', 'select2d', 'resetScale2d'];
        const config = {
            displaylogo: false,
            modeBarButtonsToRemove: removeButtons,
        }

        return (
            <div className='flex flex-col md:flex-row'>
                <Plot
                    className='overflow-hidden rounded-lg mx-auto max-w-sm sm:max-w-xl'
                    data={[
                        {
                            x: fechas,
                            y: v07,
                            name: '7:00 am',
                            type: 'bar',
                            hoverinfo: 'y',
                            marker: { color: 'yellow' }
                        },
                        {
                            x: fechas,
                            y: v14,
                            name: '2:00 pm',
                            type: 'bar',
                            hoverinfo: 'y',
                            marker: { color: 'orange' }
                        },
                        {
                            x: fechas,
                            y: v21,
                            name: '9:00 pm',
                            type: 'bar',
                            hoverinfo: 'y',
                            marker: { color: 'blue' }
                        },
                        {
                            x: fechas,
                            y: media,
                            name: 'media',
                            type: 'scatter',
                            hoverinfo: 'y',
                            line: { color: 'black', shape: 'spline' },
                        },
                    ]}
                    layout={{
                        title: titulo,
                        barmode: 'group',
                        autosize: true,
                        xaxis: { title: 'fecha' },
                        yaxis: { title: variable },
                    }}
                    config={config}
                />
            </div>
        );
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

                        <div className='gap-0 columns-1 sm:columns-2'>
                            <MapContainer center={[13.8007, -88.8052]} zoom={8} scrollWheelZoom={true} className='h-[26rem]'>
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

                    {datosEncabezado(estacion)}

                    {seccionDatos(estacion, "Temperatura", "temperatura")}

                    {seccionDatos(estacion, "Humedad Relativa", "humedad")}

                    {seccionDatos(estacion, "Presion de vapor", "presion de vapor")}

                    {
                        //TODO this graph could probably look better in another style (currently using bars)
                        //also, there could be the phenomenon variables here (fray	ftea	ftee	fgra	fchu)
                        //(diferent presentation as those variables record the time of the day when the phenomenon happened)
                        seccionDatos(estacion, "Precipitación", "precipitacion")
                    }

                    {
                        //TODO this seccion could also have the wind direccion variables (rd07	rd14	rd21	rd)
                        //diferent presentation as those variables record the direction of wind as a not numerical char (N, W, E, S, C)
                        seccionDatos(estacion, "Viento", "viento")
                    }

                    {seccionDatos(estacion, "Nubosidad", "nubosidad")}

                    {seccionDatos(estacion, "Visibilidad", "visivilidad")}

                    {
                        //TODO preguntar que significan las variables de estado de suelo y estado de rocio (es, er, erd)
                        //que significa la medida 012 y .012, como se interpreta
                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
