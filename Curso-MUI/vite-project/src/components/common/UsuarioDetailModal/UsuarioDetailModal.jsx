// src/components/common/UsuarioDetailModal/UsuarioDetailModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Fade,
  CircularProgress,
  Button,
  alpha,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Shield as ShieldIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: '#0F172A',
    borderRadius: '16px',
    border: `1px solid ${alpha('#3B82F6', 0.2)}`,
    maxWidth: '900px',
    width: '100%',
    margin: '16px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: 'rgba(8,17,40,0.96)',
  padding: '20px 24px',
  borderBottom: `1px solid ${alpha('#3B82F6', 0.2)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  flex: 1,
  minWidth: 0,
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha('#3B82F6',0.2)} 0%, ${alpha('#2563EB',0.3)} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#3B82F6',
  flexShrink: 0,
}));

const SectionCard = styled(Box)(({ theme }) => ({
  background: 'rgba(30,58,138,0.1)',
  border: `1px solid ${alpha('#3B82F6',0.15)}`,
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    borderColor: alpha('#3B82F6',0.3),
    background: 'rgba(30,58,138,0.15)',
  },
  minHeight: '220px',
  maxHeight: '240px',
  width: '100%',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha('#1E3A8A',0.3)} 0%, ${alpha('#1E40AF',0.2)} 100%)`,
  padding: '14px 18px',
  borderBottom: `1px solid ${alpha('#3B82F6',0.2)}`,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const SectionContent = styled(Box)(({ theme }) => ({
  padding: '18px',
  flex: 1,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: `1px solid ${alpha('#3B82F6',0.1)}`,
  '&:last-child': { borderBottom: 'none', paddingBottom:0 },
  '&:first-of-type': { paddingTop:0 },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', padding:'60px 32px', color:'rgba(255,255,255,0.7)'
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'20px', padding:'60px 32px', textAlign:'center'
}));

const InfoField = ({label,value,type='text'}) => {
  let displayValue=value;
  let chipColor='default';
  switch(type){
    case 'boolean': displayValue=value?'SI':'NO'; chipColor=value?'success':'default'; break;
    default: displayValue=value||'No especificado';
  }
  return (
    <InfoRow>
      <Typography variant="body2" sx={{color:'rgba(255,255,255,0.6)', fontSize:'0.875rem', fontWeight:500}}>{label}</Typography>
      {type==='boolean'?(
        <Chip label={displayValue} size="small" color={chipColor} sx={{
          height:'24px', fontSize:'0.75rem', fontWeight:600,
          background: value?'linear-gradient(135deg,#10B981 0%,#059669 100%)':alpha('#94A3B8',0.2),
          color: value?'#FFFFFF':'rgba(255,255,255,0.6)'
        }}/>
      ):(
        <Typography variant="body2" sx={{color:'#FFFFFF', fontSize:'0.875rem', fontWeight:600, textAlign:'right', maxWidth:'60%', wordBreak:'break-word'}}>
          {displayValue}
        </Typography>
      )}
    </InfoRow>
  );
};

const UsuarioDetailModal = ({open,onClose,usuario,loading=false,error=null,onRefresh})=>{
  const [isClosing,setIsClosing]=useState(false);
  useEffect(()=>{if(open)setIsClosing(false);},[open]);
  const handleClose=()=>{setIsClosing(true);setTimeout(()=>{onClose();setIsClosing(false);},200);};
  useEffect(()=>{
    const handleEsc=(e)=>{if(e.key==='Escape' && open) handleClose();};
    if(open) document.addEventListener('keydown',handleEsc);
    return ()=>document.removeEventListener('keydown',handleEsc);
  },[open]);

  const renderLoading=()=>(
    <LoadingContainer>
      <CircularProgress size={48} thickness={4} sx={{color:'#3B82F6'}}/>
      <Typography variant="body1" sx={{fontSize:'0.875rem', fontWeight:500}}>Cargando informacion del usuario...</Typography>
    </LoadingContainer>
  );

  const renderError=()=>(
    <ErrorContainer>
      <Box sx={{width:'64px',height:'64px',borderRadius:'50%',background:alpha('#EF4444',0.2),display:'flex',alignItems:'center',justifyContent:'center',color:'#EF4444',fontSize:'32px'}}>!</Box>
      <Box>
        <Typography variant="h6" sx={{color:'#FFFFFF',fontWeight:600,mb:1}}>Error al cargar los datos</Typography>
        <Typography variant="body2" sx={{color:'rgba(255,255,255,0.6)',mb:2}}>{error||'Ha ocurrido un error inesperado'}</Typography>
        {onRefresh && <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRefresh} sx={{background:'linear-gradient(135deg,#3B82F6 0%,#2563EB 100%)','&:hover':{background:'linear-gradient(135deg,#2563EB 0%,#1D4ED8 100%)'}}}>Reintentar</Button>}
      </Box>
    </ErrorContainer>
  );

  const renderContent=()=>{
    if(loading) return renderLoading();
    if(error) return renderError();
    if(!usuario) return null;

    const sections=[
      { title:'Datos Personales', icon:<PersonIcon sx={{fontSize:'20px',color:'#3B82F6'}} />, fields:[
        {label:'Matricula de Revista',value:usuario.matriculaRevista},
        {label:'Apellido',value:usuario.apellido},
        {label:'Nombre',value:usuario.nombre},
      ]},
      { title:'Informacion Militar', icon:<ShieldIcon sx={{fontSize:'20px',color:'#3B82F6'}} />, fields:[
        {label:'Jerarquia',value:usuario.jerarquia},
        {label:'Destino',value:usuario.destino},
        {label:'Cuerpo',value:usuario.cuerpo||'N/A'},
        {label:'Escalafon',value:usuario.escalafon||'N/A'},
      ]},
      { title:'Nivel y Permisos', icon:<SecurityIcon sx={{fontSize:'20px',color:'#3B82F6'}} />, fields:[
        {label:'Nivel',value:usuario.nivel||'N/A'},
        {label:'Tipo de Clasificacion',value:usuario.tipoClasificacion||'N/A'},
        {label:'Confianza',value:usuario.confianza||false,type:'boolean'},
        {label:'Super Confianza',value:usuario.superConfianza||false,type:'boolean'},
      ]},
      { title:'Datos de Acceso e Informacion del Sistema', icon:<InfoIcon sx={{fontSize:'20px',color:'#3B82F6'}} />, fields:[
        {label:'Usuario',value:usuario.logon},
        {label:'Fecha de Creacion',value:usuario.fechaCreacion?new Date(usuario.fechaCreacion).toLocaleString('es-AR'):'No disponible'},
      ]}
    ];

    return (
      <Box sx={{
        display:'grid',
        gridTemplateColumns:{ xs:'1fr', md:'1fr 1fr' },
        gap:3,
        mt:3 // separa las secciones del header
      }}>
        {sections.map((section,i)=>(
          <SectionCard key={i}>
            <SectionHeader>{section.icon}<Typography variant="subtitle2" sx={{color:'#FFFFFF', fontWeight:600, fontSize:'0.875rem'}}>{section.title}</Typography></SectionHeader>
            <SectionContent>{section.fields.map((f,j)=><InfoField key={j} {...f}/>)}</SectionContent>
          </SectionCard>
        ))}
      </Box>
    );
  };

  return (
    <StyledDialog open={open && !isClosing} onClose={handleClose} TransitionComponent={Fade} transitionDuration={300} maxWidth="md" fullWidth>
      <StyledDialogTitle>
        <HeaderContent>
          <HeaderIcon><PersonIcon sx={{fontSize:'28px'}}/></HeaderIcon>
          <Box sx={{flex:1,minWidth:0}}>
            <Typography variant="h6" sx={{color:'#FFFFFF', fontWeight:700, fontSize:'1.125rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
              {usuario?`${usuario.apellido}, ${usuario.nombre}`:'Cargando...'}
            </Typography>
            {usuario && <Typography variant="caption" sx={{color:'rgba(255,255,255,0.6)', fontSize:'0.75rem', fontWeight:500, display:'block', mt:0.25}}>Usuario: {usuario.logon} | MR: {usuario.matriculaRevista}</Typography>}
          </Box>
        </HeaderContent>
        <IconButton onClick={handleClose} sx={{color:'rgba(255,255,255,0.7)','&:hover':{color:'#FFFFFF',background:alpha('#3B82F6',0.1),transform:'rotate(90deg)'},transition:'all 0.2s ease'}}><CloseIcon/></IconButton>
      </StyledDialogTitle>
      <DialogContent sx={{padding:'32px 24px 24px 24px', background:'#0F172A'}}>
        {renderContent()}
      </DialogContent>
    </StyledDialog>
  );
};

export default UsuarioDetailModal;
