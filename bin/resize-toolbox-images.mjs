import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const dirname = fileURLToPath( path.dirname( import.meta.url ) );

const toolboxDir = path.resolve( dirname, '../src/assets/toolbox' );
const heckDir = path.resolve( toolboxDir, 'heck' );
const files = await fs.readdir( heckDir ).catch( ( e ) => {
  if ( e.code === 'ENOENT' ) {
    throw new Error( `Tried to scan ${ heckDir } but not found. Put images in the directory and try again` );
  }

  throw e;
} );

await Promise.all(
  files.map( async ( filename ) => {
    console.info( `processing ${ filename }` );

    const filepath = path.resolve( heckDir, filename );
    const newpath = path.resolve( toolboxDir, path.basename( filename, path.extname( filename ) ) ) + '.webp';

    await sharp( filepath )
      .resize( 256, 256 )
      .webp()
      .toFile( newpath );
  } )
);
