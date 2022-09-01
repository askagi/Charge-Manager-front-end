import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getItem } from '../utils/storage';

function AllUseStates() {
    const navigate = useNavigate();
    const token = getItem('token');
    const headers = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const [messageDeleteCharge, setMessageDeleteCharge] = useState('');
    const [colorDeleteCharge, setColorDeleteCharge] = useState('');
    const [backGroundDeleteCharge, setBackGroundDeleteCharge] = useState('');

    const [openModalRegisterClient, setOpenModalRegisterClient] = useState(false);
    const [openModalRegisterCharge, setOpenModalRegisterCharge] = useState(false);
    const [openModalFilterCharge, setOpenModalFilterCharge] = useState(false);
    const [allClients, setAllClients] = useState([]);
    const [sorted, setSorted] = useState(false);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState({
        checked1: false,
        checked2: true,
        checked3: false
    });

    const [orientatioMenuMobi, setOrientatioMenuMobi] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [erroEmail, setErroEmail] = useState('');
    const [erroPassword, setErroPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = useState({
        section1: true,
        section2: false,
        section3: false
    });
    const [openEye, setOpenEye] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        againstpassword: ''
    });

    const [opeanModalDelteCharge, setOpenaModalDelteCharge] = useState(false);
    const [title, setTitle] = useState('Cadastro de Cobrança');
    const [clientCurrent, setClientCurrent] = useState([]);

    const [checkedFilter, setCheckedFilter] = useState({
        checked1: false,
        checked2: false
    });

    const [erroName, setErroName] = useState('');
    const [erroCpf, setErroCpf] = useState('');
    const [erroTelephone, setErroTelephone] = useState('');
    const [erroAginstPassword, setErroagainstPassword] = useState('');
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [responseSuccessRegisterCharge, setResponseSuccessRegisterCharge] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);

    const [openSettings, setOpenSettings] = useState(false);
    const [openModalEditUser, setOpenModalEditUser] = useState(false);

    const [formClient, setFormClient] = useState({
        name: '',
        email: '',
        cpf: '',
        telephone: '',
        address: '',
        compliment: '',
        cep: '',
        district: '',
        city: '',
        state: ''
    });
    const [erroCep, setErroCep] = useState('');

    const [typeAction, setTypeAction] = useState('');
    const [allCharges, setAllCharges] = useState([]);
    const [currentCharge, setCurrentCharge] = useState({});
    const [responseSuccessEditClient, setResponseSuccessEditClient] = useState(false);
    const [responseSuccessRegisterClient, setResponseSuccessRegisterClient] = useState(false);
    const [responseSuccessDeleteCharge, setResponseSuccessDeleteCharge] = useState(false);
    const [responseSuccessEditCharge, setResponseSuccessEditCharge] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [openModalChargeDetails, setOpenModalChargeDetails] = useState(false);
    const [filterByStatus, setFilterByStatus] = useState('all');

    return (
        {
            orientatioMenuMobi, setOrientatioMenuMobi,
            filterByStatus, setFilterByStatus,
            openModalChargeDetails, setOpenModalChargeDetails,
            refresh, setRefresh,
            colorDeleteCharge, setColorDeleteCharge,
            backGroundDeleteCharge, setBackGroundDeleteCharge,
            messageDeleteCharge, setMessageDeleteCharge,
            currentCharge, setCurrentCharge,
            responseSuccessDeleteCharge, setResponseSuccessDeleteCharge,
            responseSuccessEditClient, setResponseSuccessEditClient,
            responseSuccessRegisterClient, setResponseSuccessRegisterClient,
            responseSuccessRegisterCharge, setResponseSuccessRegisterCharge,
            responseSuccessEditCharge, setResponseSuccessEditCharge,
            allCharges, setAllCharges,
            typeAction, setTypeAction,
            api, navigate, erroCep, setErroCep,
            headers,
            openModalRegisterClient, setOpenModalRegisterClient,
            openModalRegisterCharge, setOpenModalRegisterCharge,
            openModalFilterCharge, setOpenModalFilterCharge,
            allClients, setAllClients,
            open, setOpen,
            checked, setChecked,
            sorted, setSorted,
            email, setEmail,
            password, setPassword,
            error, setError,
            erroEmail, setErroEmail,
            erroPassword, setErroPassword,
            loading, setLoading,
            clientCurrent, setClientCurrent,
            activeStep, setActiveStep,
            openEye, setOpenEye,
            form, setForm,
            opeanModalDelteCharge, setOpenaModalDelteCharge,
            title, setTitle,
            checkedFilter, setCheckedFilter,
            erroName, setErroName,
            erroCpf, setErroCpf,
            erroTelephone, setErroTelephone,
            erroAginstPassword, setErroagainstPassword,
            responseSuccess, setResponseSuccess,
            invalidToken, setInvalidToken,
            openSettings, setOpenSettings,
            openModalEditUser, setOpenModalEditUser,
            formClient, setFormClient,
            token
        }
    )
};

export default AllUseStates;