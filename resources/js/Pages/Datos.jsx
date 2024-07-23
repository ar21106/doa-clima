import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Icon from '@mdi/react';
import Plot from 'react-plotly.js';
import { mdiCloudQuestionOutline } from '@mdi/js';

export default function Datos({ auth, estaciones, datos }) {
    //sacando los datos como arrays para los gráficos
    if (Object.keys(datos).length !== 0) {
        //arrays
        var fechas = [];

        //sacando info de los datos para agregarlos a los arrays
        Object.keys(datos).forEach(key => {
            fechas.push(datos[key].fecha);
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
            <option key="Temperatura Humeda" value="Temperatura Humeda">Temperatura Humeda</option>
            <option key="Humedad relativa" value="Humedad relativa">Humedad relativa</option>
            <option key="Presión de vapor" value="Presión de vapor">Presión de vapor</option>
            <option key="Precipitación" value="Precipitación">Precipitación</option>
            <option key="Fenómenos" value="Fenómenos">Fenómenos</option>
            <option key="Velocidad del viento" value="Velocidad del viento">Velocidad del viento</option>
            <option key="Dirección del viento" value="Dirección del viento">Dirección del viento</option>
            <option key="Nubosidad" value="Nubosidad">Nubosidad</option>
            <option key="Visibilidad" value="Visibilidad">Visibilidad</option>
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

    function graficos(){}

    //gráfico 1: lineas 1 variable a traves del tiempo
    //TODO finish this graph
    function grafico1(titulo, variable, v) {

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
                            y: v,
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
                            <div className='m-4 w-1/2 border-2 rounded-lg'>
                                {tabla()}
                            </div>

                            <div className='m-4'>
                                Graficos
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}