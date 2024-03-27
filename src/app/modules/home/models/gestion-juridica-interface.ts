export interface IMunicipio {
    ID:                 number;
    CreatedAt:          Date;
    UpdatedAt:          Date;
    DeletedAt:          null;
    id_municipio:       number;
    codigo_municipio:   string;
    nombre_municipio:   string;
    id_departamento:    number;
    create_at:          Date;
    update_at:          Date;
}

export interface IEtapaDemandado {
    id_etapa_demandado:     number;
    nombre_etapa_demandado: string;
}

export interface ITipoInmueble {
    id_tipo_inmueble: number;
    tipo_inmueble:    string;
}

export interface IAdministrador {
    ID:                       number;
    CreatedAt:                Date;
    UpdatedAt:                Date;
    DeletedAt:                null;
    id_admin_copropiedad:     number;
    nombre_admin_copropiedad: string;
    create_at:                Date;
    update_at:                Date;
}

export interface IBanco {
    id_banco:     number;
    nombre_banco: string;
    create_at:    Date;
    update_at:    Date;
}

export interface ITipoCuenta {
    ID:                 number;
    CreatedAt:          Date;
    UpdatedAt:          Date;
    DeletedAt:          null;
    id_tipo_cuenta:     number;
    nombre_tipo_cuenta: string;
    create_at:          Date;
    update_at:          Date;
}

export interface IDemandante {
    id_demandante:             number;
    identificacion_demandante: string;
    nombre_demandante:         string;
    direccion_demandante:      string;
    id_municipio:              number;
    id_tipo_cuenta:            number;
    num_cuenta:                string;
    id_admin_copropiedad:      number;
    fecha_personeria:          Date;
    id_banco:                  number;
    id_tipo_inmuebles:         number;
}

export interface IJuzgado {
    id_juzgado:     number;
    nombre_juzgado: string;
    id_municipio:   number;
}

export interface INumJuzgado {
    id_num_juzgado: number;
    num_juzgado:    string;
    id_juzgado:     number;
}

export interface IDemandado {
    id_demandado:             number;
    identificacion_demandado: string;
    nombre_demandado:         string;
    email_demandado:          string;
}

export interface ICronologia {
    id_cronologia:     number;
    nombre_cronologia: string;
}

