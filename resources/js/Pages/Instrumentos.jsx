import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Datos({ auth }){
    //TODO IMPORTANT complete this view
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-xl text-gray-800 leading-tight">Modelos 3D - instrumentos</h2>}
        >
            <Head title="Modelos 3D" />
            <div>Hola mundo !</div>
        </AuthenticatedLayout>
    );
}