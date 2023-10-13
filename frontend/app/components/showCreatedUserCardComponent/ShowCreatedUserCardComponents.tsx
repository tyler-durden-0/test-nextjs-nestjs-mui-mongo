import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ShowCreatedUserCardInterface from './interface/ShowCreatedUserCardInterface';

export default function ShowCreatedUserCard({data}: {data: ShowCreatedUserCardInterface}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Created User Info
        </Typography>
        <Typography variant="h5" component="div">
            {data.firstName} {data.lastName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data._id}
        </Typography>
        <Typography variant="body2">
            Other information:
            <br />
            Email: {data.email}
            <br />
            Country: {data.country}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={data.onClick} size="small">Close card</Button>
      </CardActions>
    </Card>
  );
}
