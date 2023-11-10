import { useEffect, useRef, useState } from "react";
import { useSearchUsersByUsernameOrEmailMutation } from "../../../rtkQuery/apiSliceUsers";

import './addMemberToWorkspace.css'
import { EmailIcon } from "../../../utils/icons/iconsMenu";
import { useInviteMemberToWorkspaceMutation } from "../../../rtkQuery/apiSliceWorkspace";
import { toast } from "react-toastify";

const ItemMember = ({username, email, handleAddMemeber,isMember})=>{
  return (
    <li
      className={`p-2 item-user mb-1 ${isMember && "item-user-ismember"}`}
      role="button"
      onClick={
        ()=>{
          if(isMember) return
          handleAddMemeber({username, email})
        }
      }
    >
      {
        username
      }

    </li>
  )
}

const ItemMemberToIvite = ({username, email, handleDeleteMember})=>{

  return (
    <div
      className={`d-flex gap-3 align-items-center item-member-to-invite px-3 py-1 `}
    >
      <span className="font_size_10_12">
        {
          username || email
        }
      </span>

      <button
       className="f-bold"
       onClick={
        ()=>{
          handleDeleteMember(email)
        }
      }
      >
        x
      </button>
    </div>
  )
}

const AddMemberToWorkspace = ({
  members=[],
  workspaceId
}) => {
  const [loading, setLoading] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [listSearchedUsers, setListSearchedUsers] = useState([])
  const [listMembersWorkspace, setListMembersWorkspace] = useState([])

  const [listOfMembersToInvite,setListOfMembersToIvite] = useState([])

  const [dataInput, setDataInput] = useState("")
  const debounceRef = useRef()
  const [searchUsersRequest] = useSearchUsersByUsernameOrEmailMutation()
  const [inviteMemberToWorkspaceRequest] = useInviteMemberToWorkspaceMutation()

  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   setValue,
  //   // setError,
  //   formState: { isValid}
  // } = useForm();

  const getListUsersAsync = async (text)=>{
    try {
      const data = await searchUsersRequest({text}).unwrap()
      if(data.code === 200){
        const listUser = mapListSearchedUsers(data.response, listMembersWorkspace)
        setListSearchedUsers(listUser)
      }else{
        setListSearchedUsers([])
      }
    } catch (error) {
      setListSearchedUsers([])
    }
  }

  const mapListSearchedUsers = (listSearchedUsers = [], listMembers = []) => {
    return listSearchedUsers.map(user=>{
      return {
        ...user,
        isMember: listMembers.some(member => member.id === user.id)
      }
    })
  }

  const  removeDuplicates = (arr, campo)=> {
    const unique = []
    const valoresUnicos = new Set()

    for (const item of arr) {
      const valorCampo = item[campo]
      if (!valoresUnicos.has(valorCampo)) {
        valoresUnicos.add(valorCampo)
        unique.push(item)
      }
    }

    return unique
  }


  const validateIsEmail = (text)=>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(text)
  }

  const handleAddMemeber = (data)=>{
    const list = removeDuplicates([...listOfMembersToInvite, data],"email")
    setListOfMembersToIvite(list)
  }

  const handleDeleteMember = (email)=>{
    setListOfMembersToIvite([...listOfMembersToInvite.filter(member=>member.email !== email)])
  }


  const handleChange = (e)=>{
    const value = e.target.value

    if(debounceRef.current)
      clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(()=>{
      getListUsersAsync(value ? value : '')
      // if(value)

      // else
      //   setListSearchedUsers([])
    },400)

    setDataInput(value)
    setIsEmail(validateIsEmail(value))
  }

  const onSubmit = async () =>{
    try {
      setLoading(true)
      const body = listOfMembersToInvite[0]
      console.log(body)
      const response = await inviteMemberToWorkspaceRequest({workspaceId,body}).unwrap()
      if(response.code === 200){

        setListOfMembersToIvite([])
        setDataInput("")
        toast.success("Tablero creado!",{icon:"😃"})

      }
    } catch (error) {
      toast.error("Upss! ocurrió un error",{icon:"😕"})
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{

    setListMembersWorkspace(members)

  },[workspaceId])

  return (
    <div
      className="modal fade"
      id="modalAddMemberToWorkspace"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        {/* <ModalMoreTopics/> */}
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-flex justify-content-between">
              <span className="w-100 text-center">
                Invitar al espacio de trabajo
              </span>
              <button
                id="modalClose"
                type="button"
                onClick={() => {
                  // setValue("name","")
                  // setValue("have_default_stages",false)
                }}
                className="btn-close eliminarModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="container-fluid mt-3">
              <div className="mb-3 postion-relative input-add-member-container">
                <input
                  type="text"
                  name="dataInput"
                  className="form-control mb-2"
                  placeholder="dirección de correo electrónico o usuario"
                  value={dataInput}
                  onChange={handleChange}
                />

                {dataInput && listSearchedUsers.length > 0 && (
                  <div className="border border-secondary-subtle p-2 rounded shadow-sm">
                    <ul className="list-unstyled list-users-content">
                      {listSearchedUsers.map((item) => (
                        <ItemMember
                          key={item.id}
                          username={item.username}
                          isMember={item.isMember}
                          email={item.email}
                          id={item.id}
                          handleAddMemeber={handleAddMemeber}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {dataInput && listSearchedUsers.length === 0 && !isEmail && (
                  <div className="border border-secondary-subtle p-2 rounded shadow-sm">
                    Parece que esa persona no es miembro de projekts todavía.
                    Añada su correo electrónico para poder invitarla.
                  </div>
                )}

                {dataInput && listSearchedUsers.length === 0 && isEmail && (
                  <div
                    role="button"
                    className="border border-secondary-subtle p-2 rounded shadow-sm email-member"
                    onClick={() => {
                      handleAddMemeber({ username: "", email: dataInput });
                      setDataInput("");
                      setListSearchedUsers([]);
                    }}
                  >
                    <span className="me-2">
                      <EmailIcon fill="var(--white)" />
                    </span>

                    {dataInput}
                  </div>
                )}
              </div>

              <p>Listado de usuarios a invitar</p>
              <div className="mb-3 d-flex flex-wrap gap-3 list-of-users-to-invite">
                {listOfMembersToInvite.map((user, id) => (
                  <ItemMemberToIvite
                    key={id}
                    username={user.username}
                    email={user.email}
                    handleDeleteMember={handleDeleteMember}
                  />
                ))}
              </div>


              <div className="d-flex justify-content-end">
                <button
                  className="bgPurple-color white-color px-3 py-2 rounded button-send-invitation"
                  disabled={(listOfMembersToInvite.length === 0 || loading)}
                  onClick={onSubmit}
                >
                  {
                    !loading ? 'Enviar invitación' : 'Enviando...'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberToWorkspace;
