import { defineField, defineType } from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Spelers & Coaches',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Volledige naam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Naam is verplicht'),
    }),
    defineField({
      name: 'role',
      title: 'Rol binnen de club',
      type: 'string',
      options: {
        list: [
          { title: 'Speler', value: 'player' },
          { title: 'Coach', value: 'coach' },
        ],
        layout: 'radio', // Toont nette keuzerondjes in plaats van een dropdown
      },
      initialValue: 'player',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultTeam',
      title: 'Standaard team',
      description: 'Het vaste team (A of B) waar deze persoon meestal bij hoort.',
      type: 'reference',
      to: [{ type: 'team' }],
    }),
    defineField({
      name: 'email',
      title: 'E-mailadres',
      description: 'Nodig om een tijdelijke link te sturen waarmee het vervoer aangepast kan worden.',
      type: 'string',
      validation: (Rule) => Rule.email().warning('Vul een geldig e-mailadres in'),
    }),
    defineField({
      name: 'hasCar',
      title: 'Beschikt standaard over een auto?',
      description: 'Handig als voorselectie bij uitwedstrijden.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'defaultSeats',
      title: 'Standaard aantal vrije plaatsen (excl. bestuurder)',
      type: 'number',
      initialValue: 3,
      // Dit veld verschijnt alleen in Sanity Studio als 'hasCar' aangevinkt is
      hidden: ({ document }) => !document?.hasCar,
    }),
  ],
  // Dit bepaalt hoe een persoon wordt getoond in overzichten binnen Sanity Studio
  preview: {
    select: {
      title: 'name',
      role: 'role',
      team: 'defaultTeam.name',
    },
    prepare({ title, role, team }) {
      const roleLabel = role === 'coach' ? 'Coach' : 'Speler'
      return {
        title: title,
        subtitle: `${roleLabel} ${team ? `• ${team}` : ''}`,
      }
    },
  },
})
