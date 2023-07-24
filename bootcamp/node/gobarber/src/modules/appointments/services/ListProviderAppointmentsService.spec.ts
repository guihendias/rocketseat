import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

describe('ListProviderAppointments', () => {
    let fakeAppointmentsRepository: FakeAppointmentsRepository;
    let listProviderAppointments: ListProviderAppointmentsService;
    let fakeCacheProvider: FakeCacheProvider;

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 7, 24, 8, 0, 0),
        });
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 7, 24, 9, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            day: 24,
            year: 2021,
            month: 8,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
