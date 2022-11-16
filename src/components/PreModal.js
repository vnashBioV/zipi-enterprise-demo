import React from 'react'

export default function PreModal({openPre, setOpenPre}) {
    const closeModal = () => {
        setOpenPre(prev => !prev)
    }
  return (
    <>{ openPre ? 
        (<div class="modal-container">
            <div className='modal'>
                    <h1>Hello I am the modal</h1>
                    <p onClick={closeModal}>X</p>
            </div>
        </div>) : null
        }
    </>
  )
}
