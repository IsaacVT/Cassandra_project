package com.db.cassandra.tflores;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.config.DriverConfigLoader;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TfloresApplication {

    public static void main(String[] args) {

        DriverConfigLoader loader = DriverConfigLoader.fromClasspath("application.conf");
        commands(loader);

//        SpringApplication.run(TfloresApplication.class, args);
    }

    private static void commands(DriverConfigLoader loader) {
        try (
                CqlSession session = CqlSession
                        .builder()
                        .withConfigLoader(loader)
                        .build();
        ) {
            showMethod(session);
            insertMethod(session);
            updateMethod(session);
            deleteMethod(session);
        } catch (Exception e) {
            System.err.println("Error de conexión a la base de datos: " + e.getMessage());
        }
    }

    private static void showMethod (CqlSession session) {

        try {

            ResultSet show = session.execute("SELECT * FROM tutorialkeyspace.tutorialtable;");

            for (Row row : show.all()) {
                System.out.println(row.getString("email") + ", " + row.getInt("age") + ", " + row.getString("name"));
            }

        } catch (Exception e) {

            System.err.println("Error al visualizar los datos: " + e.getMessage());

        }
    }

    public static void insertMethod (CqlSession session) {

        // -----------------------------------------------------------------
        // Error al insertar los datos:
        // Consistency level LOCAL_ONE is not supported for this operation.
        // Supported consistency levels are: LOCAL_QUORUM
        // -----------------------------------------------------------------

        try {

            ResultSet insert = session.execute("INSERT INTO " +
                    "tutorialkeyspace.tutorialtable (name, email, age) " +
                    "VALUES ('Buzz', 'buzz@example.com', 30);");

            System.out.println("Inserción de datos \n" + insert);

        } catch (Exception e) {

            System.err.println("Error al insertar los datos: " + e.getMessage());

        }
    }

    public static void updateMethod (CqlSession session) {

        // -----------------------------------------------------------------
        // Error al actualizar los datos:
        // Consistency level LOCAL_ONE is not supported for this operation.
        // Supported consistency levels are: LOCAL_QUORUM
        // -----------------------------------------------------------------

        try {

            ResultSet update = session.execute("UPDATE tutorialkeyspace.tutorialtable SET age=5 WHERE email='pakojhon@example.com';");

            System.out.println("Actualización de datos \n" + update);

        } catch (Exception e) {

            System.err.println("Error al actualizar los datos: " + e.getMessage());

        }
    }

    public static void deleteMethod (CqlSession session) {

        // -----------------------------------------------------------------
        // Error al borrar los datos:
        // Consistency level LOCAL_ONE is not supported for this operation.
        // Supported consistency levels are: LOCAL_QUORUM
        // -----------------------------------------------------------------

        try {

            ResultSet delete = session.execute("DELETE FROM tutorialkeyspace.tutorialtable WHERE email='alejohn@example.com';");

            System.out.println("Eliminación de datos \n" + delete);

        } catch (Exception e) {

            System.err.println("Error al borrar los datos: " + e.getMessage());

        }
    }
}