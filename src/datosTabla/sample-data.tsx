/** @jsx jsx */
import { FC, ReactNode } from 'react';
import { css, jsx } from '@emotion/react';
import Avatar from '@atlaskit/avatar';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
  DropdownItemRadio,
  DropdownItemRadioGroup,
} from '@atlaskit/dropdown-menu';
import { token } from '@atlaskit/tokens';
import axios from 'axios';
import { lorem } from './lorem';
import { tareasUsuario } from './datosBack';

interface TareasUsuario {
  description: string;
  type: string;
  participants: Array<string>;
  topic: number;
  meeting: Array<string>;
  project: Array<string>;
  state: string;
  number: number;
  dateLimit: string;
  postition: string;
  nombre?: string;
}

function createKey(input: string) {
  return input ? input.replace(/^(the|a|an)/, '').replace(/\s/g, '') : input;
}

function iterateThroughLorem(index: number) {
  return index > lorem.length ? index - lorem.length : index;
}

// const nameWrapperStyles = css({
//   display: 'flex',
//   alignItems: 'center',
// });

// const NameWrapper: FC<{ children: ReactNode }> = ({ children }) => (
//   <span css={nameWrapperStyles}>{children}</span>
// );

// const avatarWrapperStyles = css({
//   marginRight: token('space.100', '8px'),
// });

// const AvatarWrapper: FC<{ children: ReactNode }> = ({ children }) => (
//   <div css={avatarWrapperStyles}>{children}</div>
// );

export const caption = 'List of Tareas de Usuario';

export const createHead = (withWidth: boolean) => {
  return {
    cells: [
      {
        key: 'participants',
        content: 'Encargado',
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'project',
        content: 'Proyecto',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'meeting',
        content: 'Reunión',
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'state',
        content: 'Estado',
        shouldTruncate: true,
        width: withWidth ? 15 : undefined,
      },
    ],
  };
};

export const head = createHead(true);
// export const rows = tareasUsuario.map((tarea: TareasUsuario, index: number) => ({
//   key: `row-${index}-${tarea.name}`,
//   isHighlighted: false,
//   cells: [
//     {
//       key: 'name',
//       content: (
//         <NameWrapper>
//           <AvatarWrapper>
//             <Avatar name={tarea.name} size="medium" />
//           </AvatarWrapper>
//           <a href="">{tarea.name}</a>
//         </NameWrapper>
//       ),
//     },
//     {
//       key: 'project',
//       content: tarea.project.join(', '),
//     },
//     {
//       key: 'state',
//       content: tarea.state,
//     },
//   ],
// }));
const tokenAcceso = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpZWdvLmFsdmFyYWRvLm1AdXNhY2guY2wiLCJpYXQiOjE3MDI4NjU3MTMsImV4cCI6MTcxMzY2NTcxMywiYXVkIjoiaHR0cHM6Ly9tZWV0Zmxvdy5jb20ifQ.H28xmBlggUO4MPneLuNTyfTVc6cCRtqrNgOvDiwUDdQ";
let responseProyectos: any[] = []; // Variable global para almacenar responseProyectos
let responseReuniones: any[] = []; // Variable global para almacenar responseReuniones
let nombreProyecto = [];


async function getProjectById(idProyecto: string) {
  try {
    const response = await axios.get(`http://172.111.10.181/api/project/getProjectbyID/${idProyecto}` , {
      headers: {
        Authorization: `Bearer ${tokenAcceso}`
        }
      });

      nombreProyecto = response.data.name;
    console.log('nombre del proyecto:', nombreProyecto, typeof nombreProyecto);
    return nombreProyecto;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}



async function getProjectByIdVER2(tareaU: TareasUsuario) {
  try {
    const response = await axios.get(`http://172.111.10.181/api/project/getProjectbyID/${tareaU.project[0]}` , {
      headers: {
        Authorization: `Bearer ${tokenAcceso}`
        }
      });

      tareaU.project = response.data.name;
      tareaU.nombre = tareaU.project.toString();
      console.log('nombre del proyecto:', tareaU.project, typeof tareaU.project);
      return tareaU;
  
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
}




export const rows = tareasUsuario.map((tarea: TareasUsuario, index: number) => ({
  //recuperar el nombre del proyecto
  
  tarea: getProjectByIdVER2(tarea),
  

  //recuperar el nombre de la reunion


  key: `row-${index}-${tarea.participants}`,
  isHighlighted: false,
  cells: [
    {
      key: 'participants',
      content: tarea.participants.join(', '),
      // content: (
      // content: (
      //   <NameWrapper>
      //     <AvatarWrapper>
      //       <Avatar name={tarea.participants} size="medium" />
      //     </AvatarWrapper>
      //     <a href="">{tarea.participants}</a>
      //   </NameWrapper>
      // ),
    },
    {
      key: 'project',
      // content: nombreProyecto,
      content: tarea.nombre!,
    },
    {
      key: 'meeting',
      content: tarea.meeting.join(', '),
    },
    {
      key: 'state',
      content: (
        <DropdownMenu trigger={tarea.state}>
          <DropdownItemGroup>
            <DropdownItem >Atendida</DropdownItem>
            <DropdownItem>No atendida</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      ),
    },
  ],
}));
