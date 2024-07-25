import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Icon from '@mdi/react';
import Plot from 'react-plotly.js';
import { mdiCloudQuestionOutline, mdiInformationOutline } from '@mdi/js';

export default function Datos({ auth, estaciones, datos, estacion, variable }) {
    //sacando los datos como arrays para los gráficos
    if (Object.keys(datos).length !== 0) {
        //arrays
        var x = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: []
        }
        var lineNames = Object.keys(datos[0]);

        //sacando info de los datos para agregarlos a los arrays
        Object.keys(datos).forEach(key => {
            var count = 0;
            Object.values(datos[key]).forEach(v => {
                x[count].push(v);
                count += 1;
            })
        });
    }

    const { data, setData, post, processing, reset, errors } = useForm({
        fechaDesde: '2021-01-01',
        fechaHasta: '2022-12-31',
        variable: 'Temperatura',
        estacion: 'A-31',
        orden: 'desc',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('filtro'));
    };

    function variables() {
        return (<>
            <option key="Temperatura" value="Temperatura">Temperatura</option>
            <option key="Temperatura Húmeda" value="Temperatura Húmeda">Temperatura Húmeda</option>
            <option key="Humedad Relativa" value="Humedad Relativa">Humedad Relativa</option>
            <option key="Presión de vapor" value="Presión de vapor">Presión de vapor</option>
            <option key="Precipitación" value="Precipitación">Precipitación</option>
            <option key="Fenómenos" value="Fenómenos">Fenómenos</option>
            <option key="Velocidad del viento" value="Velocidad del viento">Velocidad del viento</option>
            <option key="Dirección del viento" value="Dirección del viento">Dirección del viento</option>
            <option key="Nubosidad" value="Nubosidad">Nubosidad</option>
            <option key="Visibilidad" value="Visibilidad">Visibilidad</option>
            <option key="Estado del suelo" value="Estado del suelo">Estado del suelo</option>
            <option key="Estado del rocio" value="Estado del rocio">Estado del rocío</option>
        </>);
    }

    function orden() {
        return (<>
            <option key="desc" value="desc">Más recientes primero</option>
            <option key="asc" value="asc">Más antiguos primero</option>
        </>);
    }

    let estacionesLista = estaciones.map(function (estacion) {
        return <option key={estacion.indice} value={estacion.indice}>{estacion.indice}</option>;
    });

    function encabezados() {
        if (Object.keys(datos).length !== 0) {
            let encabezados = Object.keys(datos[0]).map(function (encabezado) {
                return <div key={encabezado}>{encabezado}</div>
            })
            return (
                <div className='font-bold px-2 bg-gray-200 grid gap-1 grid-cols-7'>
                    {encabezados}
                </div>
            );
        }
    }

    function filas() {
        if (Object.keys(datos).length !== 0) {
            let filas = Object.keys(datos).map(function (dato) {
                let celda = Object.values(datos[dato]).map(function (v) {
                    return (<div>{v}</div>);
                })
                return (
                    <div className='text-sm px-2 border-b-2 grid gap-1 grid-cols-7'>
                        {celda}
                    </div>
                );
            })
            return (filas);
        }
    }

    function tabla() {
        if (Object.keys(datos).length !== 0) {
            return (
                <div>
                    {encabezados()}
                    <div className='h-96 overflow-y-scroll'>
                        {filas()}
                    </div>
                </div>
            );
        }

        return (
            <div className='h-96 bg-gray-200 place-content-center text-center'>
                <Icon className='mx-auto' path={mdiCloudQuestionOutline} size={4} />
                No se encontraron datos, prueba con un rago de fechas diferente
            </div>
        );
    }

    function graficos() {
        if (Object.keys(datos).length !== 0) {
            function encabezado() {
                return (<>
                    <div className='font-semibold'>
                        {'Estación ' + estacion.indice + ' - ' + estacion.nombre}
                    </div>
                    <div className='px-2 py-1 flex flex-row bg-green-100 max-w-fit rounded-lg text-sm'>
                        <Icon className='place-self-center mr-1' path={mdiInformationOutline} size={0.7} />
                        Los sufijos 07, 14, 21, hacen referencia a la hora del dia
                    </div>
                </>);
            }
            switch (variable) {
                case 'Temperatura':
                    return (<>
                        {encabezado()}
                        {grafico1("Temperatura °C", "°C")}
                    </>);

                case 'Temperatura Húmeda':
                    return (<>
                        {encabezado()}
                        {grafico1("Temperatura Humeda °C", "°C")}
                    </>);

                case 'Humedad Relativa':
                    return (<>
                        {encabezado()}
                        {grafico1("Humedad relativa %", "%")}
                    </>);

                case 'Presión de vapor':
                    return (<>
                        {encabezado()}
                        {grafico1("Presión de vapor mmHg", "mmHg")}
                    </>);

                case 'Precipitación':
                    return (<>
                        {encabezado()}
                        {grafico1("Precipitación mm", "mm")}
                    </>);

                case 'Fenómenos':
                    return (<>
                        {encabezado()}
                        {grafico2()}
                    </>);

                case 'Velocidad del viento':
                    return (<>
                        {encabezado()}
                        {grafico1("Velocidad del viento (Beaufort)", "Beaufort")}
                    </>);

                case 'Dirección del viento':
                    return (<>
                        {encabezado()}
                        {
                            //TODO
                        }
                    </>);

                case 'Nubosidad':
                    return (<>
                        {encabezado()}
                        {grafico1("Nubosidad (Décimas)", "Décimas")}
                    </>);

                case 'Visibilidad':
                    return (<>
                        {encabezado()}
                        {grafico1("Visibilidad Km", "Km")}
                    </>);

                case 'Estado del suelo':
                    return (<>
                        {encabezado()}
                        {
                            //TODO
                        }
                    </>);

                case 'Estado del rocio':
                    return (<>
                        {encabezado()}
                        {
                            //TODO
                        }
                    </>);

                default:
                    break;
            }
        }
    }

    //gráfico 1: lineas 1 variable a traves del tiempo
    function grafico1(titulo, variable) {
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
                            x: x[0],
                            y: x[1],
                            name: lineNames[1],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                        {
                            x: x[0],
                            y: x[2],
                            name: lineNames[2],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                        {
                            x: x[0],
                            y: x[3],
                            name: lineNames[3],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                        {
                            x: x[0],
                            y: x[4],
                            name: lineNames[4],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                        {
                            x: x[0],
                            y: x[5],
                            name: lineNames[5],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                        {
                            x: x[0],
                            y: x[6],
                            name: lineNames[6],
                            type: 'scatter',
                            hoverinfo: 'y',
                        },
                    ]}
                    layout={{
                        title: titulo,
                        autosize: true,
                        xaxis: { title: 'fecha' },
                        yaxis: { title: variable },
                    }}
                    config={config}
                />
            </div>
        );
    }

    //grafico 2: exclusivo para fenomenos
    function grafico2() {
        //configuración
        const removeButtons = ['lasso2d', 'select2d', 'resetScale2d'];
        const config = {
            displaylogo: false,
            modeBarButtonsToRemove: removeButtons,
        }

        return (
            <div className='flex flex-col md:flex-row'>
                <Plot
                    className='overflow-hidden mx-auto rounded-lg max-w-sm sm:max-w-xl'
                    data={[
                        {
                            x: x[0],
                            y: ["00:00:00"],
                            name: 'bug fix',
                            type: 'scatter',
                            mode: 'markers',
                            visible: 'legendonly',
                            showlegend: false
                        },
                        {
                            x: x[0],
                            y: x[1],
                            name: 'Rayo',
                            type: 'scatter',
                            mode: 'markers',
                            line: { color: 'gold' },
                        },
                        {
                            x: x[0],
                            y: x[2],
                            name: 'Tormenta alrededores',
                            type: 'scatter',
                            mode: 'markers',
                            line: { color: 'skyblue' },
                        },
                        {
                            x: x[0],
                            y: x[3],
                            name: 'Tormenta',
                            type: 'scatter',
                            mode: 'markers',
                            line: { color: 'black' },
                        },
                        {
                            x: x[0],
                            y: x[4],
                            name: 'Granizo',
                            type: 'scatter',
                            mode: 'markers',
                            line: { color: 'Aqua' },
                        },
                        {
                            x: x[0],
                            y: x[5],
                            name: 'Chubasco',
                            type: 'scatter',
                            mode: 'markers',
                            line: { color: 'blue' },
                        },
                    ]}
                    layout={{
                        title: 'Fenómenos detectados',
                        autosize: true,
                        xaxis: { title: 'fecha' },
                        yaxis: { title: 'Hora', categoryorder: 'category ascending' },
                    }}
                    config={config}
                />
            </div>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Consulta de datos metereológicos completos</h2>}
        >
            <Head title="Datos" />

            <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form className='flex flex-row border-b-2 mx-2 border-dashed' onSubmit={submit}>
                            <div className='p-2'>
                                <InputLabel htmlFor="estacion" value="Estacion: " />
                                <select
                                    className='rounded-lg text-sm'
                                    id='estacion'
                                    name='estacion'
                                    onChange={(e) => setData('estacion', e.target.value)}
                                    required
                                >
                                    {estacionesLista}
                                </select>
                                <InputError message={errors.estacion} className="mt-2" />
                            </div>

                            <div className='p-2'>
                                <InputLabel htmlFor="variable" value="Variable: " />
                                <select
                                    className='rounded-lg text-sm'
                                    id='variable'
                                    name='variable'
                                    onChange={(e) => setData('variable', e.target.value)}
                                    required
                                >
                                    {variables()}
                                </select>
                                <InputError message={errors.variable} className="mt-2" />
                            </div>

                            <div className='p-2'>
                                <InputLabel htmlFor="fechaDesde" value="Desde: " />
                                <TextInput
                                    className='text-sm'
                                    type='date'
                                    min='2018-01-01'
                                    max='2021-12-31'
                                    id='fechaDesde'
                                    name='fechaDesde'
                                    onChange={(e) => setData('fechaDesde', e.target.value)}
                                    required
                                />
                                <InputError message={errors.fechaDesde} className="mt-2" />
                            </div>

                            <div className='p-2'>
                                <InputLabel htmlFor="fechaHasta" value="Hasta: " />
                                <TextInput
                                    className='text-sm'
                                    type='date'
                                    min='2018-01-01'
                                    max='2021-12-31'
                                    id='fechaHasta'
                                    name='fechaHasta'
                                    onChange={(e) => setData('fechaHasta', e.target.value)}
                                    required
                                />
                                <InputError message={errors.fechaHasta} className="mt-2" />
                            </div>

                            <div className='p-2'>
                                <InputLabel htmlFor="orden" value="orden: " />
                                <select
                                    className='rounded-lg text-sm'
                                    id='orden'
                                    name='orden'
                                    onChange={(e) => setData('orden', e.target.value)}
                                    required
                                >
                                    {orden()}
                                </select>
                                <InputError message={errors.orden} className="mt-2" />
                            </div>

                            <div className='p-2'>
                                <InputLabel htmlFor="filtro" value="Aplicar filtro: " />
                                <PrimaryButton id='filtro' disabled={processing}>
                                    filtrar
                                </PrimaryButton>
                            </div>
                        </form>

                        <div className='flex flex-row'>
                            <div className='m-4 w-1/2 border-2 h-fit rounded-lg'>
                                {tabla()}
                            </div>

                            <div className='m-4'>
                                {graficos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}